// {"react-simple": {"default": true}}
import simple from "react-simple";

function fn(simple) {
    var no = simple();
}


function outer(simple) {
    function inner() {
        var no = simple();
    }
}
