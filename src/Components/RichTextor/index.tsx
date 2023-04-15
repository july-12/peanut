import React, { useState, useEffect, forwardRef, useMemo } from 'react'
import ReactQuill from 'react-quill'
import { debounce } from 'lodash'
import hljs from 'highlight.js'

import 'react-quill/dist/quill.snow.css'
import "./index.scss"

interface IProps {
  value: string
  onChange: (value: string) => void
  placeholder: string
  style: React.CSSProperties
}

const modules = {
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value
  },
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    //   ['link', 'image'],
    ['link'],
    []
  ]
}
const formats = [
  'header',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'code-block',
  'list',
  'bullet',
  'indent',
  'link',
  'image'
]

const RichTextor = forwardRef((props: Partial<IProps>, ref: any) => {
  const noticeOutsizeChange = debounce((val) => {
    props.onChange?.(val)
  }, 200)

  const handleChange = (val: string) => {
    noticeOutsizeChange(val)
  }

  return (
    <ReactQuill
      ref={ref}
      theme="snow"
      placeholder={props.placeholder}
      style={props.style}
      defaultValue={props.value}
      onChange={handleChange}
      modules={modules}
      formats={formats}
    />
  )
})

export default RichTextor
