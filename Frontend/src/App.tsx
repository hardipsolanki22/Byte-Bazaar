import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import PageLayout from './components/layout/PageLayout'
import Product from './components/products/Product'
import SignIn from './components/auth/signin'
import SignUp from './components/auth/Signup'

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
            <SignIn />
          } path='/signin'
          />
          <Route element={
            <SignUp />
          } path='/signup'
          />
          <Route element={
            <Product />
          } path='/products/:slug' />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
