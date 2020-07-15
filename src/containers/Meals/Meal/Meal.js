import React, { Fragment } from 'react'

const meal = (props) => (
    <Fragment>
        <div>{props.mealName}</div>
        <img src={props.imageUrl} alt={props.mealName} />
    </Fragment>
)

export default meal
