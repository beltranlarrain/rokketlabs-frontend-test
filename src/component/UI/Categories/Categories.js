import React, { Component } from 'react'
import axios from 'axios'

class Categories extends Component {

    state = {
        data: [],
        selected: ''
    }

    componentDidMount () {
        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then((response) => {
            let catNames = []
            for (const element of response.data.categories) {
                catNames.push({key: element.strCategory, value: element.strCategory})
            }
            this.setState({data: catNames})
            console.log(this.state.data)
            })
    }

    changeSelectedCategoryHandler = (event) => {
        // this.setState({selected: event.target.value})
        this.state.selected = event.target.value
        console.log(this.state.selected)
    }
    
    render () {
        return (
            <select onChange={this.changeSelectedCategoryHandler}>
                {this.state.data.map((data) => <option key={data.value} value={data.value}>{data.value}</option>)}
            </select>
        )
    }
}

export default Categories
