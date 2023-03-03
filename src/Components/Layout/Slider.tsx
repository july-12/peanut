import React, { PropsWithChildren } from 'react'

interface IProps extends React.HTMLAttributes<HTMLElement> {
  temp?: string
}

const Slider = (props: PropsWithChildren<IProps>) => {
  return <div {...props} className="layout-slider" />
}

export default Slider
