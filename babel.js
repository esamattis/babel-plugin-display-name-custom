module.exports = function (babel) {
    const {types: t} = babel;
    var componentCreatorName = null;

    return {
        visitor: {
            File(path) {
                console.log("file", path);
            },

            ImportDeclaration(path) {
                if (path.node.source.value !== "react-simple") return;
                if (!componentCreatorName) {
                    componentCreatorName = {};
                }


                componentCreatorName[path.node.specifiers[0].local.name] = true;
                console.log("creators", componentCreatorName);

            },

            VariableDeclaration(path) {
                if (!componentCreatorName) return;

                if (!path.node.declarations[0].init) return;
                if (path.node.declarations[0].init.type !== "CallExpression") return;
                if (!componentCreatorName[path.node.declarations[0].init.callee.name]) return;

                var name = path.node.declarations[0].id.name;
                console.log("name", name);

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

