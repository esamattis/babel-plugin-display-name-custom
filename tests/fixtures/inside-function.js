// {"modules": {"react-simple": {"default": true}}}
import simple from "react-simple";


function fn() {
    const Foo = simple("div", {
        color: "red",
    });
}

function outer() {
    function inner() {
        const Foo = simple("div", {
            color: "red",
        });
    }
}
