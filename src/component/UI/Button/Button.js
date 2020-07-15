import React from 'react'

import { Button } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';




const button = (props) => (
    <Button type="primary" shape="round" icon={<DownloadOutlined />} size='large' onClick={() => props.clicked(this, props.selected)} style={{ marginTop: '20px' }}>
        {props.children}
    </Button>
);

export default button;