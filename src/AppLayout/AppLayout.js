import React, { Component, Fragment } from 'react'
import axios from 'axios'

import { Layout, Menu, Spin, Space } from 'antd'
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
        selected: '',
        mealList: [],
        initialLoad: true,
        categoriesLoading: false,
        mealsLoading: false
    }

    componentDidMount() {
        this.setState({ categoriesLoading: true })
        axios.get('https://www.themealdb.com/api/json/v1/1/categories.php')
            .then(async response => {
                const categoryNames = []
                for (const { strCategory } of response.data.categories) {
                    categoryNames.push({ key: strCategory, value: strCategory })
                }
                await this.setState({ categories: categoryNames })
                console.log(this.state.categories)
                this.setState({ categoriesLoading: false })
                await this.setState({ selected: this.state.categories[0].key })
            })
    }

    changeSelectedCategoryHandler = async event => {
        await this.setState({ selected: event.target.value })
        console.log(this.state.selected)
    }

    loadMealsHandler = (event, selected) => {
        this.setState({ mealsLoading: true })
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
                this.setState({ mealsLoading: false })
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

        const loadingSpinner = (marginLeft = 0) => {
            return (
                <Space size='large' style={{ marginLeft: marginLeft }}>
                    <Spin size="large" tip="Loading..." />
                </Space>
            )
        }

        let dropdownContent = <Categories data={this.state.categories} action={this.changeSelectedCategoryHandler} />
        if (this.state.categoriesLoading) {
            menuItems = loadingSpinner('20%')
            dropdownContent = loadingSpinner()
        }

        let mealContent = <Meals data={this.state.mealList} />

        if (this.state.mealsLoading) {
            mealContent = loadingSpinner()
            initialImage = <div />
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
                                {dropdownContent}
                                <br />
                                {<Button clicked={this.loadMealsHandler} selected={this.state.selected}>Get ideas!</Button>}
                                <br />
                                {mealContent}
                                {initialImage}
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