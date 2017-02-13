const babel = require("babel-core");
const fs = require("fs");

const fixtures = fs.readdirSync(__dirname + "/fixtures");


describe("compile fixtures to snapshots:", () => {

    fixtures.forEach(fixtureFile => {

        test(fixtureFile, () => {

            const filePath = __dirname + "/fixtures/" + fixtureFile;

            const lines = fs.readFileSync(filePath).toString().split("\n");

            const options = JSON.parse(lines[0].slice(2).trim());

            const output = babel.transformFileSync(filePath, {
                babelrc: false,
                plugins: [
                    [__dirname + "/../plugin.js", options],
                ],
            });

            expect(output.code).toMatchSnapshot();
        });

    });

});
