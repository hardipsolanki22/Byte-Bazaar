import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import PageLayout from './components/layout/PageLayout'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <PageLayout childern={<Index />}>
          </PageLayout>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
