
import './App.css';
import {Routes,Route} from "react-router-dom"
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import Policy from './Pages/Policy';
import PagenotFFound from './Pages/PagenotFFound';
import Register from './Pages/Auth/Register';
import Login from './Pages/Auth/Login';
import Dashboard from './Pages/user/Dashboard';
import PrivateRoute from './components/Route/Private';
import ForgotPassword from './Pages/Auth/forgotpassword';
import AdminRoute from './components/Route/AdminRoute';
import AdminDashboard from './Pages/Admin/adminDashboard';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import User1 from './Pages/Admin/User1';
import Orders from './Pages/user/Orders';
import Profile from './Pages/user/Profile';
import Products from './Pages/Admin/Products';
import UpdateProducts from './Pages/Admin/UpdateProducts';
import Search from './Pages/Search';
import ProductDetails from './Pages/ProductDetails';
import Categories from './Pages/Categories';
import CategoryProduct from './Pages/CategoryProduct';
import CartPage from './Pages/CartPage';
import AdminOrders from './Pages/Admin/AdminOrders';



function App() {
  return (
    <>
     <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/product/:slug' element={<ProductDetails/>}/>
      <Route path="/categories" element={<Categories />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/category/:slug" element={<CategoryProduct />} />
      <Route path='/search' element={<Search/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/dashboard' element={<PrivateRoute/>}>
      <Route path='User' element={<Dashboard/>}/>
      <Route path='user/orders' element={<Orders/>}/>
      <Route path='user/profile' element={<Profile/>}/>
      </Route>
      <Route path='/dashboard' element={<AdminRoute/>}>
      <Route path='admin' element={<AdminDashboard/>}/>
      <Route path='admin/create-catogery' element={<CreateCategory/>}/>
      <Route path='admin/create-product' element={<CreateProduct/>}/>
      <Route path='admin/product/:slug' element={<UpdateProducts/>}/>
      <Route path="admin/products" element={<Products />} />
      <Route path='admin/user' element={<User1/>}/>
      <Route path='admin/orders' element={<AdminOrders/>}/>
      </Route>
      <Route path='/login' element={<Login/>}/>
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/policy' element={<Policy/>}/>
      <Route path='/*' element={<PagenotFFound/>}/>

      
     </Routes>
      
    </>
  );
}

export default App;
