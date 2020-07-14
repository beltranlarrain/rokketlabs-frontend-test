import React, { Fragment } from 'react'

const meal = (props) => (
    <Fragment>
        <div>Meal name: {props.mealName}</div>
        <div>Image: {props.mealImage}</div>
    </Fragment>
)

export default meal
