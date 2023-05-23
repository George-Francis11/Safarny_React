import React, { useEffect, useState } from 'react';
import './styles.css';
import { useParams, useLocation } from 'react-router-dom';
import { Button, Form, FormGroup, Label, Input, FormText } from 'semantic-ui-react';
import axiosApiInstance from '../../../utils/axios-middleware';



function AdminForm({ onClick, tripData }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  let effectLock = false;



  const createData = () => {
    setLoading(true);
    axiosApiInstance.post(`${process.env.REACT_APP_API_URL}/admin/admins`,
      {admin: {
        name,
        email,
        password}
        })
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

    effectLock = true;
      }
  , [])


  return ( loading ? <h1>Loading...</h1> :
    <div>
      <div className="FormManagment">
        <Form className='form'>
          <Form.Field>
            <label>Admin Name</label>
            <input placeholder={name} value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>Email</label>
            <input placeholder={email} value={email} onChange={(e) => setEmail(e.target.value)} />
          </Form.Field>
          <Form.Field>
            <label>password</label>
            <input type='password' placeholder={password} value={password} onChange={(e) => setPassword(e.target.value)} />
          </Form.Field>
          <Button type='submit' onClick={createData}>Update</Button>
        </Form>
      </div>
    </div>

  )
}

export default AdminForm