import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Landing = () => {
  const params = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (params.classId) {
      navigate(`/class/${params.classId}/posts`)
    }
  }, [params.classId])

  return null
}

export default Landing
