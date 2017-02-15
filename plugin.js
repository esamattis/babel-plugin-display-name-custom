const {dirname, resolve} = require("path");

const isLocal = s => s.trim()[0] === ".";

const createPlugin = (defaultOptions = {}) => babel => {
    const {types: t} = babel;
    var componentCreatorNames = null;

    const addCreatorName = name => {
        if (!componentCreatorNames) {
            componentCreatorNames = {};
        }
        componentCreatorNames[name] = true;
    };

    const isComponentCreator = (importedName, path, state) => {
        var modules = state.opts.modules;

        modules = Object.assign({}, defaultOptions.modules, modules);

        const importDeclaration = path.findParent(p => t.isImportDeclaration(p.node));
        const moduleString = importDeclaration.node.source.value;

        if (!isLocal(moduleString)) {
            return modules[moduleString] && modules[moduleString][importedName];
        }

        const sourcePath = resolve(dirname(state.file.opts.filename), moduleString);
        const sourceRoot = state.file.opts.sourceRoot || process.cwd();

        const localModuleString = Object.keys(modules).find(configPath => {
            if (isLocal(configPath)) {
                const fullConfigPath = resolve(sourceRoot, configPath);
                return fullConfigPath === sourcePath;
            }
        });

        return modules[localModuleString] && modules[localModuleString][importedName];
    };

    return {
        visitor: {
            Program() {
                componentCreatorNames = null;
            },

            ImportSpecifier(path, state) {
                if (isComponentCreator(path.node.imported.name, path, state)) {
                    addCreatorName(path.node.local.name);
                }
            },

            ImportDefaultSpecifier(path, state) {
                if (isComponentCreator("default", path, state)) {
                    addCreatorName(path.node.local.name);
                }
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

                const name = path.node.declarations[0].id.name;

                var sibling = path;

                if (path.parent.type === "ExportNamedDeclaration") {
                    sibling = path.findParent(p => p.node === path.parent);
                }

                const left = t.memberExpression(t.identifier(name), t.identifier("displayName"));
                const right = t.stringLiteral(name);

                sibling.insertAfter(
                    t.expressionStatement(t.assignmentExpression("=", left, right))
                );
            },
        },
    };
};

const plugin = createPlugin();
plugin.createPlugin = createPlugin;
module.exports = plugin;
