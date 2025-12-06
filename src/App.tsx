import { BrowserRouter } from 'react-router-dom'
import { AppRouter } from './routes/Routes'
import { BackgroundProvider } from './context/Context'

function App() {
  return (
    <BackgroundProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </BackgroundProvider>
  )
}

export default App
