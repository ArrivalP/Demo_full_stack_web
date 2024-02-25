import React, { useEffect,useState } from 'react'
import { ErrorResponse, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Swal from 'sweetalert2';
interface FormData {
  name: string;
  email: string;
  oldPassword: string;
  newPassword:string;
}
const Edit = () => {
  const { user_id } = useParams();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    oldPassword: '',
    newPassword:'',
  });
  useEffect(()=>{
    getUserById();
  },[user_id]);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
      
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
  };
  const getUserById =async() =>{
      try {
        const response = await axios.get('http://localhost:9090/api/v1/user/'+user_id);
        if(response.data){
          const { name, email } = response.data;          
          setFormData((prevFormData) => ({ ...prevFormData,name,email}));
        }
      } catch (error) {
      
      }
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

        if (!formData.oldPassword.trim()) {
          newErrors.oldPassword = 'Old Password is required';
          isValid = false;
        }
        if (!formData.newPassword.trim()) {
          newErrors.newPassword = 'New Password is required';
          isValid = false;
        }
        setErrors(newErrors);
        return isValid;
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.put('http://localhost:9090/api/v1/user/'+user_id, formData);
        if(response.data){
          Swal.fire({
            text:"Update User Success",
            icon:'success'
          }).then(()=>{
            window.location.href ='/dashboard';
          });

        }
      }catch(error){
        Swal.fire({
          icon: 'error',
          title:'Have an Error Occurs',
          text:'Your old-password must be correct and your new-password wont be the same',

        });
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
    <form onSubmit={handleUpdateUser}>
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
        <label htmlFor="oldPassword" className="form-label">
          Old Password
        </label>
        <input
          type="password"
          className={`form-control ${errors.oldPassword ? 'is-invalid' : ''}`}
          id="oldPassword"
          name="oldPassword"
          placeholder="Enter your old password"
          value={formData.oldPassword}
          onChange={handleChange}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="oldPassword" className="form-label">
          New Password
        </label>
        <input
          type="password"
          className={`form-control ${errors.newPassword ? 'is-invalid' : ''}`}
          id="newPassword"
          name="newPassword"
          placeholder="Enter your new password"
          value={formData.newPassword}
          onChange={handleChange}
        />
        {errors.password && <div className="invalid-feedback">{errors.password}</div>}
      </div>
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  </div>
  );
}

export default Edit