import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/User/DashBoard';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import ChatRoom from './components/ChatRoom';
import Create from './components/User/Create';
import Swal from 'sweetalert2';
import Edit from './components/User/Edit';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [name,setName] =useState<string>(localStorage.getItem('name') || '');
  const [adminId, setAdminId]=useState<string>(localStorage.getItem('adminId')|| '') 
  useEffect(()=>{
    localStorage.setItem('isLoggedIn', String(isLoggedIn));
    localStorage.setItem('name', name);
    localStorage.setItem('adminId',adminId);
  },[isLoggedIn,name,adminId]);

  const handleLogin = (name:string,adminId:string) => {
    Swal.fire({
        text: "Login Succesful",
        icon: "success"
      }).then(() => {
        setName(name);
        setAdminId(adminId);
        setIsLoggedIn(!isLoggedIn);
        window.location.href="/dashboard";
      });
  };
  const handleLogout = () => {
    Swal.fire({
      text: "Logout Succesful",
      icon: "success"
    }).then(()=>{
      setIsLoggedIn(false);
      window.location.href = '/login';
    })
  };

  const handleRegister=()=>{
    Swal.fire({
      text: "Register Successful!",
      icon: "success"
    }).then(()=>{
      window.location.href ='/login';
    })
  };
  return (
    <Router>
      <div className="container mt-3">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container-fluid">
           
            <div className='navbar-brand'>
              {isLoggedIn?name:"DemoApp"}
            </div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                {!isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <Link to="/login" className="nav-link">
                        Login
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/register" className="nav-link">
                        Register
                      </Link>
                    </li>
                  </>
                )}
                {isLoggedIn && (
                  <>
                    <li className="nav-item">
                      <Link to="/dashboard" className="nav-link">
                        Dashboard
                      </Link>
                    </li>
                    <li className="nav-item">
                      <Link to="/chatroom" className="nav-link">
                        ChatRoom
                      </Link>
                    </li>
                    <li className="nav-item">
                      <button className="btn btn-link nav-link" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </nav>

        <Routes>
          <Route path="/login" element={
          <Login onLogin={handleLogin} setName={setName} setAdminId={setAdminId} /> } />
          <Route path="/register" element={<Register onRegister={handleRegister}/>} />
          <Route
            path="/dashboard"
            element={isLoggedIn ? <Dashboard adminId={adminId} /> : <Navigate to="/login" />}
          />
          <Route
            path="/chatroom"
            element={isLoggedIn ? <ChatRoom name={name} /> : <Navigate to="/login" />}
          />
          <Route path='/create'element={isLoggedIn?<Create /> :<Navigate to="/login"/>} />
          <Route path='/edit/:user_id'element={isLoggedIn?<Edit /> :<Navigate to="/login"/>} />
          <Route path='/' 
          element={isLoggedIn? <Navigate to="/dashboard" />:<Navigate to="/login"/>}/>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
