// {"modules": {"./tests/fixtures/local": {"createComponent": true}}}
import {createComponent as other, no} from "./local";

const Foo = other("div", {
    color: "red",
});

var nope = no();
