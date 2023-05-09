import React from 'react'
import './home.css'
import Navbar from '../../components/navbar/Navbar'
import Header from '../../components/header/Header'
import MailList from '../../components/mailList/MailList'
import Footer from '../../components/footer/Footer'


const Home = () => {
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
