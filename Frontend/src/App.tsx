import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Index from './pages/Index'
import PageLayout from './components/layout/PageLayout'
import Product from './pages/Product'
import SignIn from './components/auth/Signin'
import SignUp from './components/auth/Signup'
import Account from './pages/Account'
import Cart from './pages/Cart'
import Address from './components/checkout/Address'
import Payment from './components/checkout/Payment'
import Order from './pages/Order'
import SingleOrder from './components/order/SingleOrder'
import Rating from './pages/Rating'
import Deshboard from './pages/admin/Deshboard'
import AdminPageLayout from './components/layout/admin/AdminPageLayout'
import AddProduct from './pages/admin/product/AddProduct'
import AdminProdutsList from './pages/admin/product/Products'
import SingleProduct from './pages/admin/product/SingleProduct'
import Coupon from './pages/admin/coupon/Coupon'
import AddCoupon from './pages/admin/coupon/AddCoupon'
import Users from './pages/admin/user/Users'
import OrdersByAdmin from "./pages/admin/order/Order"
import SingleOrderByAdmin from "./pages/admin/order/SingleOrder"
import VerifyEmail from './components/auth/VerifyEmail'
import { useEffect } from 'react'
import { useAppDispatch } from './app/hooks'
import { currentUser } from './features/user/userSlice'
import AuthLayout from './components/layout/AuthLayout'
import ForgotPassowrd from './components/auth/ForgotPassowrd'
import AddCategory from './pages/admin/category/AddCategory'
import Category from './pages/admin/category/Category'
import UpdateCategory from './pages/admin/category/UpdateCategory'
import UpdateProduct from './pages/admin/product/UpdateProduct'

const App = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(currentUser())
  }, [dispatch])

  return (
    <BrowserRouter>
      <Routes>
        {/* Normal user routes */}
        <Route path='/' element={
          <PageLayout />
        } >
          <Route element={
            <Index />
          } path='/' />
          <Route element={
            <AuthLayout>
              <SignIn />
            </AuthLayout>
          } path='/signin'
          />
          <Route element={
            <AuthLayout>
              <SignUp />
            </AuthLayout>
          } path='/signup'
          />
          <Route element={
            <AuthLayout>
              <VerifyEmail />
            </AuthLayout>
          } path='/verify-email/:verificationToken'
          />
          <Route element={
            <ForgotPassowrd />
          } path='/forgot-password/:forgotPasswordToken'
          />
          <Route element={
            // <AuthLayout authentication>
            <Account />
            // </AuthLayout>
          } path='/account' />
          <Route element={
            <Product />
          } path='/products/:slug' />
          <Route element={
            <AuthLayout authentication>
              <Cart />
            </AuthLayout>
          } path='/checkout/cart' />

          <Route element={
            <AuthLayout authentication>
              <Address />
            </AuthLayout>
          } path='/checkout/address' />
          <Route element={
            <AuthLayout authentication>
              <Payment />
            </AuthLayout>
          } path='/checkout/payment' />
          <Route element={
            <AuthLayout authentication>
              <Order />
            </AuthLayout>
          } path='/my-orders' />

          <Route element={
            <AuthLayout authentication>
              <SingleOrder />
            </AuthLayout>
          } path='/my-orders/:orderId' />
          <Route element={
            <AuthLayout authentication>
              <Rating />
            </AuthLayout>
          } path='/rating' />
        </Route>

        {/* Admin routes */}
        <Route element={
          <AdminPageLayout />
        } path='/admin'
        >
          <Route element={
            <Deshboard />
          } path='/admin' />
          <Route element={
            <AddProduct />
          } path='/admin/add-product' />
          <Route element={
            <AdminProdutsList />
          } path='/admin/products' />
          <Route element={
            <SingleProduct />
          } path='/admin/products/:slug' />
          <Route element={
            <UpdateProduct />
          } path='/admin/products/:slug/update' />
          <Route element={
            <Coupon />
          } path='/admin/coupon' />
          <Route element={
            <AddCategory />
          } path='/admin/add-category' />
          <Route element={
            <UpdateCategory />
          } path='/admin/category/:slug' />
          <Route element={
            <Category />
          } path='/admin/category' />
          <Route element={
            <AddCoupon />
          } path='/admin/add-coupon' />
          <Route element={
            <Users />
          } path='/admin/users' />
          <Route element={
            <OrdersByAdmin />
          } path='/admin/order' />
          <Route element={
            <SingleOrderByAdmin />
          } path='/admin/order/:orderId' />

        </Route>

      </Routes>
    </BrowserRouter>
  )
}

export default App
