import React, { Component, Fragment} from 'react'

import Meal from './Meal/Meal'

class Meals extends Component {
    render () {
        return (
            <Fragment>
                <div>Here are the Meals!</div>
                <Meal mealName='meal 1 name' mealImage='meal 1 image'/>
                <div>...</div>
                <Meal mealName='meal n name' mealImage='meal n image'/>
            </Fragment>
        )
    }
}

export default Meals