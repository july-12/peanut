import React from 'react'
import { Link } from 'react-router-dom'
import { getToken } from '@/utils/token'

import './index.scss'

const Forbidden = () => {
  return (
    <div className="forbidden">
      对不起，无当前内容操作权限!
      {!getToken() && (
        <div>
          请<Link to="/login">登录</Link>后操作
        </div>
      )}
    </div>
  )
}

export default Forbidden
