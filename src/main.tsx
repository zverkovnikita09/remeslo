import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from 'react-query'
import ErrorBoundary from './app/providers/ErrorBoundary.tsx'
import { AuthProvider } from './app/providers/AuthProvider.tsx'
import { NotificationsProvider } from './app/providers/NotificationsProvider.tsx'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(

  <ErrorBoundary
    fallback={<p>Произошла ошибка</p>}
  >
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <NotificationsProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </NotificationsProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </ErrorBoundary>,
)
