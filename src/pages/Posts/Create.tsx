import React, { useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Dispatch, useStore } from '@/store'
import { useDispatch } from 'react-redux'
import PostForm from './Form'

import './form.scss'

const CreatePost = () => {
  const dispatch = useDispatch<Dispatch>()
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const {
    user: { currentUser, fetched }
  } = useStore('user')

  useEffect(() => {
    if (fetched && !currentUser) {
      navigate(`/login?from=${location.pathname}`)
    }
  }, [fetched, currentUser])

  const handleSubmit = async (value: any) => {
    value.post.course_id = params.classId
    const res = await dispatch.post.createPost(value)
    navigate(`/class/${params.classId}/posts/${res.id}`)
  }
  return (
    <div className="post-form">
      <PostForm onSubmit={handleSubmit} />
    </div>
  )
}

export default CreatePost
