import React from 'react'

interface IProps extends React.HTMLAttributes<HTMLElement> {
  temp?: string
}

const Content = (props: React.PropsWithChildren<IProps>) => {
  return <div {...props} className="layout-content" />
}

export default Content
