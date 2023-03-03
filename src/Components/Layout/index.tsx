import React, { PropsWithChildren } from 'react'

import './index.scss'

interface IProps extends React.HTMLAttributes<HTMLElement> {
  direction?: 'vertical' | 'horizon'
}

const Layout = (props: PropsWithChildren<IProps>) => {
  const { className, children, direction, ...rest } = props
  return (
    <div
      {...rest}
      className={`layout ${direction ? `layout-${direction}` : ''} ${className || ''}`}
    >
      {children}
    </div>
  )
}

export default Layout
