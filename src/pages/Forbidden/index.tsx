import React from 'react'
import { Link } from 'react-router-dom'

import './index.scss'

const Forbidden = () => {
  return (
    <div className="forbidden">
      对不起，当前无操作权限, 请先<Link to="/login">登录</Link>!
    </div>
  )
}

export default Forbidden
