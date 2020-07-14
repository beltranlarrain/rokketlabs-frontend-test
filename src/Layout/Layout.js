import React, { Component, Fragment} from 'react'

import Meals from '../containers/Meals/Meals'
import Categories from '../component/UI/Categories/Categories'

class Layout extends Component {

    render () {
        return (
            <Fragment>
                <div>Welcome to Meal previewer!</div>
                <Categories />
                <div>Category Info</div>
                <Meals />
            </Fragment>
        )
    }
}

export default Layout