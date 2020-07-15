import React from 'react'
import { Card } from 'antd';

const { Meta } = Card;

const meal = (props) => (
    <Card
        hoverable
        style={{ width: 500, marginTop: 40, marginInline: '40 40', marginLeft: 20, marginRight: 20, display: 'inline-block' }}
        cover={<img alt={props.mealName} src={props.imageUrl} />}>
        <Meta title={props.mealName} description='Want to know more about this awesome dish?' />
        <a href={'https://es.lmgtfy.com/?q=' + props.mealName + '&pp=1'} target='_blank' rel="noopener noreferrer">Click here!</a>
    </Card>
)

export default meal
