import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import PageLayout from './components/layout/PageLayout'
import Product from './pages/Product'

const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <PageLayout />
        } >
          <Route element={
            <Index />
          } path='/' />
          <Route element={
            <Product />
          } path='/products' />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
