import React from "react";
import ReactDOM from "react-dom";

import simple from "react-simple";

import {Blue} from "./other";


const Red = simple("div", {
    color: "red",
});


const Root = () => (
    <div>
        <Red>red</Red>
        <Red>red 2</Red>
        <Blue>blue</Blue>
    </div>
);


const el = document.getElementById("app");
ReactDOM.render(<Root />, el);


