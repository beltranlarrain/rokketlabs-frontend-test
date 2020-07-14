import React from 'react';

import classes from './button.module.css';

const button = (props) => (
    <button
        className={classes.Button}
        onClick={() => props.clicked(this, props.selected)}> {props.children}</button >
);

export default button;