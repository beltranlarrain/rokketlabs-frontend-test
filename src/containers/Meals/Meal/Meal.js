import React, { Fragment } from 'react'

const meal = (props) => (
    <Fragment>
        <div>Meal name: {props.mealName}</div>
        <img src={props.imageUrl} />
    </Fragment>


)

export default meal
