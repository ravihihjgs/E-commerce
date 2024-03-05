import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useNavigate,useLocation } from 'react-router-dom'
import '../../Style/Authstyle.css'
import { useAuth } from '../../context/auth';

const Login = () => {

  const[email,setEmail]=useState("")
  const[password,setPassword]=useState("")
  const navigate =useNavigate()
  const[auth,setAuth]=useAuth()
  const location = useLocation();

  const handleSubmit= async(e)=>{
    e.preventDefault();
    try{
      const res=await axios.post('/api/v1/auth/login',
          {email,password})
          if (res && res.data.success) {
            toast.success(res.data && res.data.message,{extendedTimeout:10000,});
            setAuth({
              ...auth,
              user:res.data.user,
              token:res.data.token,
          })
          localStorage.setItem('auth',JSON.stringify(res.data));
            navigate(location.state ||  "/");
          } else {
            toast.error(res.data.message);
          }
    }
    catch(error){
      console.log(error)
      toast.error("Something went wrong");
    }
  }

  return (
    <div>
      <Layout title={"Login-Artifulstitches"}>
      <div className='form-container'>
          

          <form onSubmit={handleSubmit}>
          <h4 className='title'>Log In</h4>
            <div>

              <div className="m-1">
                <input 
                  type="email" 
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="form-control" 
                  id="exampleInputEmail1"  
                  placeholder="Enter Your Email"
                  required
                  />
              </div>

              <div className="m-1">
                <input 
                  type="password" 
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="form-control" 
                  id="exampleInputPassword1" 
                  placeholder="Password" 
                  required
                  />
              </div>
              <div className='mt-1'>
              <button 
                  type="button" 
                  className="btn btn-primary"
                  onClick={() => {
                    navigate("/forgot-password");
                  }}
                  >Forgot Password</button>
              </div>

              <button type="submit" className="btn btn-primary mt-1">Submit</button>
            </div>
          </form>
        </div>
      </Layout>
    </div>
  )
}

export default Login
