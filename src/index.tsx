import App from '@/App'
import { loadableReady } from '@loadable/component'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      cacheTime: 1000 * 60 * 5, // 5분
      retry: 0
    }
  }
})

void loadableReady(() => {
  hydrateRoot(
    document.getElementById('root') as HTMLDivElement,
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <App />
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </BrowserRouter>
  )
})

// https://webpack.kr/api/hot-module-replacement/
if (module.hot) {
  if (process.env.NODE_ENV === 'development') {
    module.hot.accept()
    document.querySelector('#root > *')?.remove()
  }
}
