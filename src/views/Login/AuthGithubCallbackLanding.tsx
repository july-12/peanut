import React, { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import request from '@/utils/request'
import { setToken } from '@/utils/token'
import { useNavigate } from 'react-router-dom'
import './auth-github.scss'

const AUthGithubCallbackLanding = () => {
  const [query] = useSearchParams()
  const navigate = useNavigate()
  const code = query.get('code')
  const authorizing = useCallback(async () => {
    if (code) {
      try {
        const res: any = await request.get('/api/auth/github/callback', {
          params: { code }
        })
        if (res?.token) {
          setToken(res.token)
          navigate('/')
        }
      } catch (err) {
        navigate('/login')
      }
    }
  }, [code])
  useEffect(() => {
    authorizing()
  }, [authorizing])
  if (!code) {
    return <div className="callback-landing">code is missing, Please login again...</div>
  }
  return <div className="callback-landing">authorizing...</div>
}

export default AUthGithubCallbackLanding
