import React from 'react'
import { Button } from 'antd'

import './index.scss'

const Setting = () => {
  const options = ['主题', '多语言', '导出']
  return (
    <div className="setting">
      <div className="option-list">
        {options.map((item) => (
          <Button style={{ minWidth: 100 }} type="primary" key={item} className="setting-item">
            {item}
          </Button>
        ))}
      </div>
    </div>
  )
}

export default Setting
