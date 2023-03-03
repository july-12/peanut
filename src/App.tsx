import Layout from '@/Components/Layout/index'
import Header from '@/Components/Layout/Header'
import Slider from '@/Components/Layout/Slider'
import Categories from '@/Components/Categories'
import Discussions from '@/Components/Discusssions'

function App() {
  return (
    <Layout direction="vertical">
      <Header />
      <Categories />
      <div className="layout-content">
        <Slider>
          <Discussions />
        </Slider>
        <main className="layout-content-container">content</main>
      </div>
    </Layout>
  )
}

export default App
