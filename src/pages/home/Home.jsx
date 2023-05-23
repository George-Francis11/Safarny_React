import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './home.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'
import axiosApiInstance from '../../utils/axios-middleware'


const Home = () => {
  const location = useLocation();
  const data = location.state?.data;
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(true)
  let effectLock = false;

  useEffect(() => {
    if (effectLock) return;
    console.log("data", data);
    axiosApiInstance.get('/trips')
      .then(res => {
        setTrips(res.data)
        setLoading(false)
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      })
    effectLock = true;
  }, [])
  return (
    <div>
      <Navbar />
      <Header />
      <div className="homeContainer">
      </div>
      <MailList />
      <Footer />
    </div>
  )
}

export default Home
