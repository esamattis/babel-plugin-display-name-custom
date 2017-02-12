module.exports = function (babel) {
    const {types: t} = babel;
    var componentCreatorNames = null;

    return {
        visitor: {
            Program() {
                componentCreatorNames = null;
            },

            ImportDeclaration(path) {
                if (path.node.source.value !== "react-simple") return;
                if (!componentCreatorNames) {
                    componentCreatorNames = {};
                }

                componentCreatorNames[path.node.specifiers[0].local.name] = true;

            },

            VariableDeclaration(path) {
                if (!componentCreatorNames) return;

                if (!path.node.declarations[0].init) return;
                if (path.node.declarations[0].init.type !== "CallExpression") return;

                const creatorName = path.node.declarations[0].init.callee.name;

                if (!componentCreatorNames[creatorName]) return;

                var scope = path.scope;

                var usingImportedCreator = false;

                while (scope) {
                    if (scope.bindings[creatorName]) {
                        usingImportedCreator = scope.bindings[creatorName].kind === "module";
                        break;
                    }
                    scope = scope.parent;
                }

                if (!usingImportedCreator) return;


                var name = path.node.declarations[0].id.name;

                var left = t.memberExpression(t.identifier(name), t.identifier("displayName"));

                var sibling = path;

                if (path.parent.type === "ExportNamedDeclaration") {
                    sibling = path.findParent(p => p.node === path.parent);
                }

                sibling.insertAfter(
                    t.expressionStatement(
                        t.assignmentExpression(
                            "=",
                            left,
                            t.stringLiteral(name)
                        )
                    )
                );

            },
        },
    };
};

