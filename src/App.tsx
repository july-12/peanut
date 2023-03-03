import Layout from '@/Components/Layout/index'
import Header from '@/Components/Layout/Header'
import Slider from '@/Components/Layout/Slider'
import Categories from '@/Components/Categories'
import PostsNav from '@/Components/PostsNav'
import { ConfigProvider } from 'antd'

import 'antd/dist/reset.css'

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#3e7aab'
        }
      }}
    >
      <Layout direction="vertical">
        <Header />
        <Categories />
        <div className="layout-content">
          <Slider>
            <PostsNav />
          </Slider>
          <main className="layout-content-container">content</main>
        </div>
      </Layout>
    </ConfigProvider>
  )
}

export default App
