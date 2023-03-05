import Layout from '@/Components/Layout/index'
import Header from '@/Components/Layout/Header'
import Content from '@/Components/Layout/Content'
import Slider from '@/Components/Layout/Slider'
import Categories from '@/Components/Categories'
import PostsNav from '@/Components/PostsNav'
import HomePage from '@/views/HomePage'
import Classes from '@/views/Classes'
import Login from '@/views/Login'
import AuthGithubCallbackLanding from '@/views/Login/AuthGithubCallbackLanding'
import Forbidden from '@/views/Forbidden'
import { ConfigProvider } from 'antd'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import 'antd/dist/reset.css'

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
const PostContent = () => {
  return <div>PostContent</div>
}

const PostCreate = () => {
  return <div>PostCreate</div>
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

const AdminLayout = () => {
  return (
    <Layout direction="vertical">
      <Header />
      <Content>
        <Slider>Slider</Slider>
        <main className="layout-content-container">
          <Outlet />
        </main>
      </Content>
    </Layout>
  )
}

function App() {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3e7aab'
          }
        }}
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/class" element={<ClassLayout />}>
            <Route index element={<ClassIndex />} />
            <Route path=":classId">
              <Route index element={<ClassContent />} />
              <Route path="posts">
                <Route index element={<PostIndex />} />
                <Route path="new" element={<PostCreate />} />
                <Route path=":id" element={<PostContent />}></Route>
              </Route>
            </Route>
          </Route>
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="classes" element={<Classes />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/auth/github/callback" element={<AuthGithubCallbackLanding />} />
          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </ConfigProvider>
    </BrowserRouter>
  )
}

export default App
