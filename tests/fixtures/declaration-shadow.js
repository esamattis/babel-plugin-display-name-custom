// {"react-simple": {"default": true}}
import simple from "react-simple";

function fn() {
    const simple = () => null;
    var no = simple();
}

function outer() {
    const simple = () => null;
    function inner() {
        var no = simple();
    }
}
