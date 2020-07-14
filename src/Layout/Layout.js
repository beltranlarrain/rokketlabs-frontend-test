import React, { Component, Fragment } from 'react'
import axios from 'axios'

import Meals from '../containers/Meals/Meals'
import Categories from '../component/UI/Categories/Categories'
import Button from '../component/UI/Button/Button'

class Layout extends Component {

    state = {
        categories: [
            { key: "Beef", value: "Beef" },
            { key: "Chicken", value: "Chicken" },
            { key: "Dessert", value: "Dessert" },
            { key: "Lamb", value: "Lamb" },
            { key: "Miscellaneous", value: "Miscellaneous" },
            { key: "Pasta", value: "Pasta" },
            { key: "Pork", value: "Pork" },
            { key: "Seafood", value: "Seafood" },
            { key: "Side", value: "Side" },
            { key: "Starter", value: "Starter" },
            { key: "Vegan", value: "Vegan" },
            { key: "Vegetarian", value: "Vegetarian" },
            { key: "Breakfast", value: "Breakfast" },
            { key: "Goat", value: "Goat" }
        ],
        selected: 'Beef',
        mealList: []
    }

    changeSelectedCategoryHandler = async event => {
        await this.setState({ selected: event.target.value })
        console.log(this.state.selected)
    }

    loadMealsHandler = (event, selected) => {
        const baseUrl = 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
        const finalUrl = baseUrl + selected
        axios.get(finalUrl)
            .then(async response => {
                const handlerList = []
                for (const element of response.data.meals) {
                    handlerList.push(element)
                }
                await this.setState({ mealList: handlerList })
                console.log(this.state.mealList)
            })
    }

    render() {
        return (
            <Fragment>
                <div>Welcome to Meal previewer!</div>
                <Categories data={this.state.categories} action={this.changeSelectedCategoryHandler} />
                <br />
                <Button clicked={this.loadMealsHandler} selected={this.state.selected}>Click  here!</Button>
                <div>Category Info</div>
                <Meals />
            </Fragment>
        )
    }
}

export default Layout