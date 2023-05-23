import React, { useEffect, useState } from 'react';
import './styles.css';
import { useParams, useLocation } from 'react-router-dom';
import { lastDayOfDecade } from 'date-fns';
import axiosApiInstance from '../../../utils/axios-middleware';
import { Button } from 'react-bootstrap';



function Admin() {
  const location = useLocation();
  const data = location.state?.data;
  // get the trip id from the url
  const admin_id = useParams().id;
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  let effectLock = false;

  const deleteAdmin = () => {
    setLoading(true);
    axiosApiInstance.delete(`http://localhost:8080/v1/admin/admins/${admin_id}`)
      .then(res => {
        setLoading(false);
        window.location.href = '/admin/admins';
      })
      .catch(err => {
        console.log(err);
        window.location.href = '/admin/login';
      })
  };

  useEffect(() => {
    if (effectLock) return;
    if (data) {
      setAdmin(data);
      setLoading(false);
      return;
    }
    axiosApiInstance.get(`http://localhost:8080/v1/admin/admins/${admin_id}`)
      .then(res => {
        console.log("Res", res);
        setAdmin(res.data.message);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
    effectLock = true;
  }, [])

  return ( loading ? <h1>Loading...</h1> :
    <div>
      <h1>Admin</h1>
      <h2>ID: {admin._id}</h2>
      <h2>name: {admin.name}</h2>
      <h2>email: {admin.email}</h2>
      <h2>role: {admin.role}</h2>
      <form action="">
        <Button onClick={deleteAdmin} className='btn btn-danger'>Delete</Button>
        </form>
    </div>


  )
}

export default Admin