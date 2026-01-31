import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import PageLayout from './components/layout/PageLayout'
import Product from './components/products/Product'
import SignIn from './components/auth/Signin'
import SignUp from './components/auth/Signup'
import Account from './pages/Account'
import Cart from './pages/Cart'

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
            <Account />
          } path='/account' />
          <Route element={
            <Product />
          } path='/products/:slug' />
          <Route path='/cart' element={
            <Cart />
          } />
        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
