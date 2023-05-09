import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../../../components/adminPanel/sideBar/index';
import sidebar_menu from '../../../components/adminPanel/sidebar.js';
import './styles.css';


function Dashboard() {
  return (
    <div className='dashboard-container'>
      <SideBar menu={sidebar_menu} />
      <div className='dashboard-body'>
      
        <Outlet />
      </div>
      </div>
  )
}

export default Dashboard