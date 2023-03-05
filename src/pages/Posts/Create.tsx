import React from 'react'
import { useParams } from 'react-router-dom'
import { Dispatch } from '@/store'
import { useDispatch } from 'react-redux'
import PostForm from './Form'

import './form.scss'

const CreatePost = () => {
  const dispatch = useDispatch<Dispatch>()
  const params = useParams()
  console.log(params)

  const handleSubmit = (value: any) => {
    value.post.course_id = params.classId
    dispatch.post.createPost(value)
  }
  return (
    <div className="post-form">
      <PostForm onSubmit={handleSubmit} />
    </div>
  )
}

export default CreatePost
