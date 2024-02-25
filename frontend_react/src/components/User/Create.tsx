import React,{useState} from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
interface FormData {
    name: string;
    email: string;
    password: string;
}

const Create:React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
          name: '',
          email: '',
          password: '',
    });
      
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
      
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          setFormData({
            ...formData,
            [e.target.name]: e.target.value,
          });
    };
      
    const validateForm = (): boolean => {
          let isValid = true;
          const newErrors: { [key: string]: string } = {};
      
          if (!formData.name.trim()) {
            newErrors.name = 'Username is required';
            isValid = false;
          }
      
          if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
            isValid = false;
          } else if (!isValidEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
            isValid = false;
          }
      
          if (!formData.password.trim()) {
            newErrors.password = 'Password is required';
            isValid = false;
          }
          setErrors(newErrors);
          return isValid;
    };
      
    const handleCreateUser = async (e: React.FormEvent) => {
        e.preventDefault();
      
        if (validateForm()) {
          try {
            const response = await axios.post('http://localhost:9090/api/v1/user/add', formData);

            if(response.data){
                Swal.fire({
                  text: "Add User Successful!",
                  icon: "success"
                }).then(()=>{
                  window.location.href ='/dashboard';
                })
            }
          }catch(error){
            console.error('Add User Failed', error);
          }
        }
    };  
    const isValidEmail = (email: string): boolean => {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return emailRegex.test(email);
    };
      
        return (
          <div className="container mt-5">
          <h2>Create</h2>
          <form onSubmit={handleCreateUser}>
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="text"
                className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                id="name"
                name="name"
                placeholder="Enter your username"
                value={formData.name}
                onChange={handleChange}
              />
              {errors.name && <div className="invalid-feedback">{errors.name}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              {errors.password && <div className="invalid-feedback">{errors.password}</div>}
            </div>
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </form>
        </div>
        );
};


export default Create