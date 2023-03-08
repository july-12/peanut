import { Provider } from 'react-redux'
import dayjs  from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'
import { ConfigProvider } from 'antd'
import Router from './Router'

dayjs.extend(relativeTime)
dayjs.locale('zh-cn')

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
