import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import Router from './Router'

import { store } from './store'

import 'antd/dist/reset.css'

function App() {
  return (
    <Provider store={store}>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: '#3e7aab'
          }
        }}
      >
        <Router />
      </ConfigProvider>
    </Provider>
  )
}

export default App
