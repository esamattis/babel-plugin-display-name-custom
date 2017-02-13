import React from "react";
import ReactDOM from "react-dom";

import defaultCreate, {createComponent} from "./create";


const Blue = createComponent("div", {
    color: "blue",
});

const Orange = defaultCreate("div", {
    color: "orange",
});

const Root = () => (
    <div>
        <Blue>using createComponent</Blue>
        <Orange>using default export</Orange>
    </div>
);


const el = document.getElementById("app");
ReactDOM.render(<Root />, el);


