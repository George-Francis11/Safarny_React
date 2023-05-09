import React, { useEffect, useState } from 'react';
import './styles.css';
import { useParams, useLocation } from 'react-router-dom';
import { lastDayOfDecade } from 'date-fns';
import axios from 'axios';


function Admin() {
  const location = useLocation();
  const data = location.state?.data;
  // get the trip id from the url
  const admin_id = useParams().id;
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (data) {
      setAdmin(data);
      setLoading(false);
      return;
    }
    axios.get(`http://localhost:8080/v1/admin/admins/${admin_id}`)
      .then(res => {
        console.log("Res", res);
        setAdmin(res.data.message);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      })
  }, [])

  return ( loading ? <h1>Loading...</h1> :
    <div>
      <h1>Admin</h1>
      <h2>ID: {admin._id}</h2>
      <h2>name: {admin.name}</h2>
      <h2>email: {admin.email}</h2>
      <h2>role: {admin.role}</h2>
    </div>


  )
}

export default Admin