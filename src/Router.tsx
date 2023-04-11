import { BrowserRouter, Routes, Route } from 'react-router-dom'

import BasicLayout from './Components/Layout/Basic'
import AdminLayout from './Components/Layout/Admin'
import ClassLayout from './Components/Layout/ClassLayout'
import Post from '@/pages/Posts/Post'
import PostCreate from '@/pages/Posts/Create'
import PostLanding from '@/pages/Posts/Landing'
import HomePage from '@/pages/HomePage'
import Classes from '@/pages/Admin/Classes'
import Dashboard from '@/pages/Admin/Dashboard'
import Users from '@/pages/Admin/Users'
import Setting from '@/pages/Admin/Setting'
import Landing from '@/pages/Admin/Classes/Landing'
import Login from '@/pages/Login'
import AuthGithubCallbackLanding from '@/pages/Login/AuthGithubCallbackLanding'
import Forbidden from '@/pages/Forbidden'

const NoMatch = () => {
  return <div>NoMatch</div>
}

const Router = () => {
  return (
    <BrowserRouter basename={import.meta.env.VITE_BASENAME}>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/class" element={<ClassLayout />}>
            <Route index element={<div>set classId in url before visit page</div>} />
            <Route path=":classId">
              <Route index element={<Landing />} />
              <Route path="posts">
                <Route index element={<PostLanding />} />
                <Route path="new" element={<PostCreate />} />
                <Route path=":id" element={<Post />}></Route>
              </Route>
            </Route>
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="classes" element={<Classes />} />
            <Route path="users" element={<Users />} />
            <Route path="setting" element={<Setting />} />
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/github/callback" element={<AuthGithubCallbackLanding />} />
        <Route path="/forbidden" element={<Forbidden />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Router
