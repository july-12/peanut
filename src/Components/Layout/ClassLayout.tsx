import { useEffect } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import Layout from '@/Components/Layout/index'
import Header from '@/Components/Layout/Header'
import Content from '@/Components/Layout/Content'
import Slider from '@/Components/Layout/Slider'
import Categories from '@/Components/Categories'
import PostsNav from '@/Components/PostsNav'
import { Dispatch } from '@/store'
import { useDispatch } from 'react-redux'
import "highlight.js/styles/atom-one-dark.css"

const ClassLayout = () => {
  const dispatch = useDispatch<Dispatch>()
  const params = useParams()

  useEffect(() => {
    if (params.classId) {
      dispatch.tag.getTags({ course_id: params.classId })
    }
  }, [params.classId])

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

export default ClassLayout
