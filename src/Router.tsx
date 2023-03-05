import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import Layout from '@/Components/Layout/index'
import Header from '@/Components/Layout/Header'
import Content from '@/Components/Layout/Content'
import Slider from '@/Components/Layout/Slider'
import BasicLayout from './Components/Layout/Basic'
import AdminLayout from './Components/Layout/Admin'
import Categories from '@/Components/Categories'
import PostsNav from '@/Components/PostsNav'
import Post from '@/pages/Posts/Post'
import PostCreate from '@/pages/Posts/Create'
import HomePage from '@/pages/HomePage'
import Classes from '@/pages/Classes'
import Login from '@/pages/Login'
import AuthGithubCallbackLanding from '@/pages/Login/AuthGithubCallbackLanding'
import Forbidden from '@/pages/Forbidden'

const NoMatch = () => {
  return <div>NoMatch</div>
}
const ClassContent = () => {
  return <div>ClassContent</div>
}

const ClassIndex = () => {
  return <div>Class Index</div>
}

const PostIndex = () => {
  return <div>Post Index</div>
}
const ClassLayout = () => {
  return (
    <Layout direction="vertical">
      <Header />
      <Categories />
      <Content>
        <Slider>
          <PostsNav />
        </Slider>
        <main className="layout-content-container">
          <Outlet />
        </main>
      </Content>
    </Layout>
  )
}

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BasicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="/class" element={<ClassLayout />}>
            <Route index element={<ClassIndex />} />
            <Route path=":classId">
              <Route index element={<ClassContent />} />
              <Route path="posts">
                <Route index element={<PostIndex />} />
                <Route path="new" element={<PostCreate />} />
                <Route path=":id" element={<Post />}></Route>
              </Route>
            </Route>
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="classes" element={<Classes />} />
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
