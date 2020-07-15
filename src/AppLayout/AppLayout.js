import React, { Component, Fragment } from 'react'
import axios from 'axios'

import { Layout, Menu } from 'antd'
import {
    CloudDownloadOutlined,
    EyeOutlined,
    CheckCircleOutlined
} from '@ant-design/icons'

import Meals from '../containers/Meals/Meals'
import Categories from '../component/UI/Categories/Categories'
import Button from '../component/UI/Button/Button'

class AppLayout extends Component {

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

        const { Header, Content, Footer, Sider } = Layout

        let menuItems = (<Menu.Item key='1' icon={<CloudDownloadOutlined />}>Loading Options!</Menu.Item>)
        if (this.state.categories !== []) {
            menuItems = this.state.categories.map(category => {
                return (
                    <Menu.Item key={category.value} icon={<CheckCircleOutlined />} style={{ marginLeft: '25px' }}>{category.value}</Menu.Item >
                )
            })
        }

        return (
            <Fragment>
                <Layout>
                    <Sider
                        style={{
                            overflow: 'visible',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                        }}>
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" selectable={false}>
                            <Menu.Item key='1' icon={<EyeOutlined />} style={{ marginTop: '30px' }}>Check them out:</Menu.Item>
                            {menuItems}
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{ marginLeft: 200, minHeight: '100vh' }}>
                        <Header className="site-layout-background" style={{ padding: 0, color: 'white', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>Welcome to the Ultimate Meal Previewer!</Header>
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial', height: '100%' }}>
                            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                                <div style={{ marginBottom: '5px', fontWeight: 'bold' }}>Select a Category:</div>
                                <Categories data={this.state.categories} action={this.changeSelectedCategoryHandler} />
                                <br />
                                <Button clicked={this.loadMealsHandler} selected={this.state.selected}>Get recipes!</Button>
                                <Meals data={this.state.mealList} />
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                    </Layout>
                </Layout>

            </Fragment >
        )
    }
}

export default AppLayout