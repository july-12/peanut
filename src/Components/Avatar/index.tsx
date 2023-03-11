import React from 'react'

import './index.scss'

interface IProps extends React.HTMLAttributes<HTMLImageElement> {
  url: string
  shape: 'circle' | 'rect'
}

const Avatar = (props: Partial<IProps>) => {
  const shape = props.shape || 'circle'

  if (!props.url) {
    return <div className={`avatar avatar-box avatar-${shape}`}>U</div>
  }

  return <img className={`avatar avatar-${shape}`} src={props.url} />
}

export default Avatar
