import React from 'react'

import "./index.scss"

const InnerHTML = ({ html }: { html: string }) => {
  return (
    <main className="inner-html ql-snow">
      <div className="ql-editor" dangerouslySetInnerHTML={{ __html: html }} />
    </main>
  )
}

export default InnerHTML
