
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
