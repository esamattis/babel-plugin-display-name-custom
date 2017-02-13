import React from "react";
import ReactDOM from "react-dom";

import simple from "react-simple";

import {Blue} from "./other";


const Red = simple("div", {
    color: "red",
}, {
    border: {
        border: "1px solid orange",
    }
});


const Root = () => (
    <div>
        <Red>red</Red>
        <Red border>red with border</Red>
        <Blue>blue</Blue>
    </div>
);


const el = document.getElementById("app");
ReactDOM.render(<Root />, el);


