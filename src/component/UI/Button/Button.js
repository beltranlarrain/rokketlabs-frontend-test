import React from 'react'

import { Button } from 'antd';
import { BulbOutlined } from '@ant-design/icons';




const button = (props) => (
    <Button type="primary" shape="round" icon={<BulbOutlined />} size='large' onClick={() => props.clicked(this, props.selected)} style={{ marginTop: '20px', marginBottom: '25px' }}>
        {props.children}
    </Button>
);

export default button;