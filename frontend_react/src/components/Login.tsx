import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
interface LoginProps {
  onLogin: (name: string,adminId:string) => void;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setAdminId: React.Dispatch<React.SetStateAction<string>>;
}
const Login: React.FC<LoginProps> = ({onLogin,setName}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
  
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:9090/api/v1/login', {
            email,
            password,
        });
        if(response.data.status===true){
            console.log(response.data.name);
            setName(response.data.name);
            onLogin(response.data.name,response.data.userId);
        }else{
          Swal.fire({
            text: response.data.message,
            icon: 'error',
            confirmButtonColor: "#d33",
          });    
        }
      } catch (error) {
        alert(error);
      }
    };
  
    return (
      <div className="container mt-5">
        <h2>Login</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="button" className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    );
  };
  
  export default Login;
