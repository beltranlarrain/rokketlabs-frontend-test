import React, { Component, Fragment } from 'react'
import axios from 'axios'

import { Layout, Menu } from 'antd'
import {
    CloudDownloadOutlined
} from '@ant-design/icons'

import Meals from '../containers/Meals/Meals'
import Categories from '../component/UI/Categories/Categories'
import Button from '../component/UI/Button/Button'
import knifeImage from '../assets/green-onion-title.jpg'
import Logo from '../assets/beltran-logo.png'

class AppLayout extends Component {

    state = {
        categories: [],
        selected: 'Beef',
        mealList: [],
        initialLoad: true
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
                    const strMealCorrected = strMeal.replace('&', 'and')
                    handlerList.push({ mealName: strMealCorrected, imageUrl: strMealThumb })
                }
                await this.setState({ mealList: handlerList })
                console.log(this.state.mealList)
                this.setState({ initialLoad: false })
            })
    }

    render() {

        const { Header, Content, Footer, Sider } = Layout

        let menuItems = (<Menu.Item key='2' icon={<CloudDownloadOutlined />}>Loading Options!</Menu.Item>)
        if (this.state.categories !== []) {
            menuItems = this.state.categories.map(category => {
                return (
                    <Menu.Item key={category.value} style={{ marginLeft: '25px' }}>{category.value}</Menu.Item >
                )
            })
        }

        let initialImage = <div />

        if (this.state.initialLoad) {
            initialImage = <img alt='initialImage' src={knifeImage} style={{ width: '68%', padding: '5px 5px' }} />
        }

        return (
            <Fragment>
                <Layout>
                    <Sider
                        style={{
                            overflow: 'auto',
                            height: '100vh',
                            position: 'fixed',
                            left: 0,
                            overflowX: 'hidden'
                        }}>
                        <div className="logo" />
                        <Menu theme="dark" mode="inline" selectable={false}>
                            <Menu.Item key='1' style={{ marginTop: '30px', fontSize: '17px' }}>Categories</Menu.Item>
                            {menuItems}
                            <img alt='beltran-logo' src={Logo} style={{ width: '35%', height: '35%', margin: '20%' }} />
                        </Menu>
                    </Sider>
                    <Layout className="site-layout" style={{ marginLeft: 200, minHeight: '100vh' }}>
                        <Header className="site-layout-background" style={{ padding: 0, color: 'white', textAlign: 'center', fontSize: '20px', fontWeight: 'bold' }}>Ultimate Choose Your Meal Experience!</Header>
                        <Content style={{ margin: '24px 16px 0', overflow: 'initial', height: '100%' }}>
                            <div className="site-layout-background" style={{ padding: 24, textAlign: 'center' }}>
                                <div style={{ marginBottom: '5px', fontSize: '20px' }}>Select a Category:</div>
                                <Categories data={this.state.categories} action={this.changeSelectedCategoryHandler} />
                                <br />
                                <Button clicked={this.loadMealsHandler} selected={this.state.selected}>Get ideas!</Button>
                                <br />
                                {initialImage}
                                <Meals data={this.state.mealList} />
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>Ultimate Choose Your Meal Experience ©2020 Created by Beltrán</Footer>
                    </Layout>
                </Layout>

            </Fragment >
        )
    }
}

export default AppLayout