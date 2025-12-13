import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/Routes'
import { BackgroundProvider } from './context/Context'

function App() {
  return (
    <BackgroundProvider>
      <BrowserRouter basename="/portfolio.dev">
        <AppRouter />
      </BrowserRouter>
    </BackgroundProvider>
  )
}

export default App
