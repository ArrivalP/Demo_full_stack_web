
import React,{useState,useEffect} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';


interface DashboardItem {
  user_id: number;
  email:string;
  name: string;
}
interface DashBoardProps {
  adminId: string;
}
const Dashboard: React.FC<DashBoardProps> = ({adminId}) => {
  const [data ,setData]=useState<DashboardItem[]>([]);
  useEffect(() => {
    fetchData();
  }, []);
  const createPage=()=>{
    window.location.href="/create";
  };
  const editPage =(user_id:number)=>{
      window.location.href="/edit/"+user_id;
  };
  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:9090/api/v1/users');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const showConfirmDelete= async(user_id:number)=>{
        const id:number =user_id;
        Swal.fire({
          title:"Delete User",
          text: "Are You Sure to Delete this User",
          showCancelButton: true,
          confirmButtonText: "Confirm",
          cancelButtonColor: "#d33",
        }).then((result)=>{
          if(result.isConfirmed){
            if(id !==parseInt(adminId)){
              deleteUser(id)
            }else{
              Swal.fire({
                text: "Can't Delete Current User",
                icon:'error',
              })
            }
          }
        })
 
  };
  const deleteUser =async(user_id:number)=>{
      try {
        const response = await axios.delete('http://localhost:9090/api/v1/user/'+user_id);
        if(response.data){
          Swal.fire({
            text: response.data,
            icon: "success"
          }).then(()=>{
            fetchData();
          });
        }
      } catch (error) {
        console.error('Error delete data:', error);
      }
  };
  return (
    <div className="container mt-5">
      <h1 className="mb-4">ADMIN Dashboard</h1>

      <div className="row mb-3">
        <div className="col-md-11"></div>
        <div className="col-md-1">
          <button className="btn btn-success btn-block" onClick={createPage}>Create</button>
        </div>
      </div>

      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="thead-dark">
                <tr>
                  <th>User Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.user_id}>
                    <td>{item.user_id}</td>
                    <td>{item.name}</td>
                    <td>{item.email}</td>
                    <td>
                      <button className="btn btn-primary mx-2" onClick={()=>editPage(item.user_id)}>Edit</button>
                      <button className="btn btn-danger mx-2" onClick={()=>showConfirmDelete(item.user_id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
