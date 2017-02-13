import React from "react";

export const createComponent = (Component, styles) => {
    return props => <Component {...props} style={styles} />;
};

export default createComponent;
