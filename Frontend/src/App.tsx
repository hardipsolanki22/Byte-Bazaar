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
import { useAppDispatch, useAppSelector } from './app/hooks'
import { currentUser } from './features/auth/authSlice'
import ForgotPassowrd from './components/auth/ForgotPassowrd'
import AddCategory from './pages/admin/category/AddCategory'
import Category from './pages/admin/category/Category'
import UpdateCategory from './pages/admin/category/UpdateCategory'
import UpdateProduct from './pages/admin/product/UpdateProduct'
import UpdateCoupon from './pages/admin/coupon/UpdateCoupon'
import AddHeroBanner from './pages/admin/heroBanner/AddHeroBanner'
import HeroBanner from './pages/admin/heroBanner/HeroBanner'
import UpdateHeroBanner from './pages/admin/heroBanner/UpdateHeroBanner'
import ProductsByCategory from './pages/ProductsByCategory'
import OrderFailed from './pages/OrderFailed'
import OrderSuccess from './pages/OrderSuccess'
import AboutPage from './pages/About'
import Protected from './components/layout/Protected'
import ProtectedAdmin from './components/layout/admin/AdminProtected'
import ProtectedForUnSecure from './components/layout/ProtectedForUnSecurePage'
import NotFound from './pages/Page404'
import { getCategories } from './features/category/categorySlice'
import { getHeroBanners } from './features/heroBanner/heroBannerSlice'
import { getProducts } from './features/product/productSlice'
import AppLoader from './components/AppLoader'

const App = () => {
  const dispatch = useAppDispatch()
  const appInitialized = useAppSelector(({ users }) => users.appInitialized)



  useEffect(() => {
    Promise.all([
      dispatch(currentUser()),
      dispatch(getCategories()),
      dispatch(getHeroBanners()),
      dispatch(getProducts()),

    ])
  }, [dispatch])


  if (!appInitialized) return <AppLoader />  // ← sirf first lo

  return (
    <BrowserRouter>
      <Routes>
        {/* Normal user routes */}
        <Route
          element={
            <PageLayout />
          } path="/"
        >
          <Route
            element={
              <Index />
            }
            path='/'
          />
          <Route
            element={
              <ProtectedForUnSecure>
                <SignIn />
              </ProtectedForUnSecure>
            }
            path='/signin'
          />
          <Route
            element={
              <ProtectedForUnSecure>
                <SignUp />
              </ProtectedForUnSecure>
            }
            path='/signup'
          />
          <Route
            element={
              <ProtectedForUnSecure>
                <VerifyEmail />
              </ProtectedForUnSecure>
            }
            path='/verify-email/:verificationToken'
          />
          <Route
            element={
              <ProtectedForUnSecure>
                <ForgotPassowrd />
              </ProtectedForUnSecure>
            } path='/forgot-password/:forgotPasswordToken'
          />
          <Route
            element={
              <Protected>
                <Account />
              </Protected>
            }
            path='/account'
          />
          <Route
            element={
              <AboutPage />
            }
            path='/about'
          />
          <Route
            element={
              <ProductsByCategory />
            }
            path='/products'
          />
          <Route
            element={
              <Product />
            }
            path='/products/:slug'
          />
          <Route
            element={
              <Protected>
                <Cart />
              </Protected>
            }
            path='/checkout/cart'
          />
          <Route
            element={
              <Protected>
                <Address />
              </Protected>
            }
            path='/checkout/address'
          />
          <Route
            element={
              <Protected>
                <Payment />
              </Protected>
            }
            path='/checkout/payment'
          />
          <Route
            element={
              <Protected>
                <OrderFailed />
              </Protected>
            }
            path='/order-failed'
          />
          <Route
            element={
              <Protected>
                <OrderSuccess />
              </Protected>
            }
            path='/order-success'
          />
          <Route
            element={
              <Protected>
                <Order />
              </Protected>
            }
            path='/my-orders'
          />

          <Route
            element={
              <Protected>
                <SingleOrder />
              </Protected>
            }
            path='/my-orders/:orderId'
          />
          <Route
            element={
              <Protected>
                <Rating />
              </Protected>
            }
            path='/rating/:productSlug'
          />
        </Route>


        {/* Admin routes */}
        <Route
          element={
            <ProtectedAdmin>
              <AdminPageLayout />
            </ProtectedAdmin>
          }
          path='/admin'
        >
          <Route
            element={
              <Deshboard />
            }
            path='/admin'
          />
          <Route
            element={
              <AddProduct />
            }
            path='/admin/add-product'
          />
          <Route
            element={
              <AdminProdutsList />
            }
            path='/admin/products'
          />
          <Route
            element={
              <SingleProduct />
            }
            path='/admin/products/:slug'
          />
          <Route
            element={
              <UpdateProduct />
            }
            path='/admin/products/:slug/update'
          />
          <Route
            element={
              <Coupon />
            }
            path='/admin/coupon'
          />
          <Route
            element={
              <AddCategory />
            }
            path='/admin/add-category'
          />
          <Route
            element={
              <UpdateCategory />
            }
            path='/admin/category/:slug'
          />
          <Route
            element={
              <Category />
            }
            path='/admin/category'
          />
          <Route
            element={
              <AddCoupon />
            }
            path='/admin/add-coupon'
          />
          <Route
            element={
              <UpdateCoupon />
            }
            path='/admin/coupon/:couponId'
          />
          <Route
            element={
              <Users />
            }
            path='/admin/users'
          />
          <Route
            element={
              <OrdersByAdmin />
            }
            path='/admin/order'
          />
          <Route
            element={
              <SingleOrderByAdmin />
            }
            path='/admin/order/:orderId'
          />
          <Route
            element={
              <AddHeroBanner />
            }
            path='/admin/add-banner'
          />
          <Route
            element={
              <HeroBanner />
            }
            path='/admin/banner'
          />
          <Route
            element={
              <UpdateHeroBanner />
            }
            path='/admin/banner/:bannerId'
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
