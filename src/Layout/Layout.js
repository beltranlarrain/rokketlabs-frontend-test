import React, { Component, Fragment } from 'react'
import axios from 'axios'

import Meals from '../containers/Meals/Meals'
import Categories from '../component/UI/Categories/Categories'
import Button from '../component/UI/Button/Button'

class Layout extends Component {

    state = {
        categories: [],
        selected: 'Beef',
        mealList: []
    }

    componentDidMount() {
        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(async response => {
                const categoryNames = []
                for (const { strCategory } of response.data.categories) {
                    categoryNames.push({ key: strCategory, value: strCategory })
                }
                await this.setState({ categories: categoryNames })
                console.log(this.state.categories)
            })
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
                for (const { strMeal, strMealThumb } of response.data.meals) {
                    handlerList.push({ mealName: strMeal, imageUrl: strMealThumb })
                }
                await this.setState({ mealList: handlerList })
                console.log(this.state.mealList)
            })
    }

    render() {
        return (
            <div>
                <Fragment>
                    <div>Welcome to Meal previewer!</div>
                    <Categories data={this.state.categories} action={this.changeSelectedCategoryHandler} />
                    <br />
                    <Button clicked={this.loadMealsHandler} selected={this.state.selected}>Click  here!</Button>
                    <Meals data={this.state.mealList} />
                </Fragment>
            </div>
        )
    }
}

export default Layout