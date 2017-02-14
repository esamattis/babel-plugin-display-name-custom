import React from "react";
import ReactDOM from "react-dom";

import {createComponent} from "./create";

const Container = createComponent("div", {
    border: "1px solid black",
});

const Red = createComponent("div", {
    color: "red",
});

const Green = createComponent("div", {
    color: "green",
});

const Blue = createComponent("div", {
    color: "blue",
});

const Root = () => (
    <Container>
        <Red>red</Red>
        <Green>green</Green>
        <Blue>blue</Blue>
    </Container>
);

const el = document.getElementById("app");
ReactDOM.render(<Root />, el);
