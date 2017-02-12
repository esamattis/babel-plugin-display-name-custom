const transformFileSync = require("babel-core").transformFileSync;
const fs = require("fs");

const fixtures = fs.readdirSync(__dirname + "/fixtures");


describe("compile fixtures to snapshots", () => {

    fixtures.forEach(fixtureFile => {

        test("compile: " + fixtureFile, () => {
            const actual = transformFileSync(__dirname + "/fixtures/" + fixtureFile, {
                plugins: [__dirname + "/../plugin.js"],
            });
            expect(actual.code).toMatchSnapshot();
        });

    });

});
