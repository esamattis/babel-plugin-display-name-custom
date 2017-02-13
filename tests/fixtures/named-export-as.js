// {"modules": {"amodule": {"createComponent": true}}}
import {createComponent as other, no} from "amodule";

const Foo = other("div", {
    color: "red",
});

var nope = no();
