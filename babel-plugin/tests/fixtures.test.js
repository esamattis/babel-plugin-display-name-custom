const babel = require("babel-core");
const fs = require("fs");

const fixtures = fs.readdirSync(__dirname + "/fixtures");


describe("compile fixtures to snapshots:", () => {

    fixtures.forEach(fixtureFile => {

        test(fixtureFile, () => {


            const lines = fs.readFileSync(__dirname + "/fixtures/" + fixtureFile).toString().split("\n");

            console.log(lines[0].slice(2).trim());
            const options = JSON.parse(lines[0].slice(2).trim());

            const output = babel.transform(lines.slice(1).join("\n"), {
                babelrc: false,
                plugins: [
                    [__dirname + "/../plugin.js", options],
                ],
            });

            expect(output.code).toMatchSnapshot();
        });

    });

});
