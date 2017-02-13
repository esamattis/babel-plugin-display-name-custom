// {"modules": {"./tests/fixtures/local": {"default": true}}}
import createComponent, {no} from "./local";

const Foo = createComponent("div", {
    color: "red",
});

var nope = no();

