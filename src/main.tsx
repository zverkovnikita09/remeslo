import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import ErrorBoundary from './app/providers/ErrorsBoundary.tsx'
import { AuthProvider } from './app/providers/AuthProvider.tsx'
import { NotificationsProvider } from './app/providers/NotificationsProvider.tsx'
import ScrollToTop from './app/providers/ScrollToTop.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(

  <ErrorBoundary
    fallback={<p>Произошла ошибка</p>}
  >
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NotificationsProvider>
          <AuthProvider>
            <ScrollToTop>
              <App />
            </ScrollToTop>
          </AuthProvider>
        </NotificationsProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </ErrorBoundary>,
)
