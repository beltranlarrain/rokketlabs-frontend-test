import React from 'react'

import Meal from './Meal/Meal'

const meals = (props) => {
    let recipes = <div>Meal will load here!</div>
    if (props.data !== []) {
        recipes = props.data.map(meal => {
            return (
                <Meal
                    key={meal.mealName}
                    mealName={meal.mealName}
                    imageUrl={meal.imageUrl} />
            )
        })
    }

    return (
        recipes
    )
}

export default meals