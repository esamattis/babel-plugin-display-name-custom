// {"modules": {"amodule": {"createComponent": true}}}
import noDefault, {createComponent, no} from "amodule";

const Foo = createComponent("div", {
    color: "red",
});


var nopeDefault = noDefault();
var nope = no();
