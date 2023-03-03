import React from 'react'

interface IProps extends React.HTMLAttributes<HTMLElement> {
  temp?: string
}

const Header = (props: IProps) => {
  return <div {...props} className="layout-header">header</div>
}

export default Header
