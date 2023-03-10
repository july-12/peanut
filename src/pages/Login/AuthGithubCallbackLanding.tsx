import React, { useCallback, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { setToken } from '@/utils/token'
import { github_authorize } from '@/api'
import { useNavigate } from 'react-router-dom'
import './auth-github.scss'

const AUthGithubCallbackLanding = () => {
  const [query] = useSearchParams()
  const navigate = useNavigate()
  const code = query.get('code')
  const authorizing = useCallback(async () => {
    if (code) {
      try {
        const res: any = await github_authorize(code)
        if (res?.token) {
          setToken(res.token)
          const from = localStorage.getItem('loginFrom')
          navigate(from || '/')
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
