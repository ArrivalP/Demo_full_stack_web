import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
interface LoginProps {
    onLogin: () => void;
}
const Login: React.FC<LoginProps> = ({onLogin}) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const navigate = useNavigate();
  
    const handleLogin = async () => {
      try {
        const response = await axios.post('http://localhost:9090/api/v1/user/login', {
            email,
            password,
        });
        if(response.data.status==true){
            onLogin();
            navigate('/dashboard');
        }else{
            alert(response.data.message);
        }

      } catch (error) {
        alert(error);
      }
    };
  
    return (
      <div className="container mt-5">
        <h2>เข้าสู่ระบบ</h2>
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
