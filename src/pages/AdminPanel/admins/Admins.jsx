import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { calculateRange, sliceData } from '../../../utils/table-pagination';
import DashboardHeader from '../../../components/adminPanel/index';
import './styles.css';
import axiosApiInstance from '../../../utils/axios-middleware';
import Button from 'react-bootstrap/Button'


import adminIcon from '../../../assets/images/admin.png';
import superAdminIcon from '../../../assets/images/superadmin.png';

function Admins() {
    const [search, setSearch] = useState('');
    const [admins, setAdmins] = useState([]);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState([]);
    let effectLock = false;

    useEffect(() => {
        if (effectLock) return;
        axiosApiInstance.get(process.env.REACT_APP_API_URL + '/v1/admin/admins')
            .then((response) => {
                console.log(response.data.message);
                setAdmins(response.data.message);
            })
            .catch((error) => {
                console.log(error);
            });
        setPagination(calculateRange(admins, 5));
        setAdmins(sliceData(admins, page, 5));
        effectLock = true;
    }, []);

    // Search
    const __handleSearch = (event) => {
        setSearch(event.target.value);
        if (event.target.value !== '') {
            let search_results = admins.filter((item) =>
                item.name.toLowerCase().includes(search.toLowerCase()) ||
                item.email.toLowerCase().includes(search.toLowerCase())
            );
            setAdmins(search_results);
        }
        else {
            __handleChangePage(1);
        }
    };

    // Change Page 
    const __handleChangePage = (new_page) => {
        setPage(new_page);
        setAdmins(sliceData(admins, new_page, 5));
    }

    return(
        <div className='dashboard-content'>
            <Link to='/admin/admins/new'><Button>New Admin</Button></Link>

            <div className='dashboard-content-container'>
                <div className='dashboard-content-header'>
                    <h2>Admins List</h2>
                    <div className='dashboard-content-search'>
                        <input
                            type='text'
                            value={search}
                            placeholder='Search..'
                            className='dashboard-content-input'
                            onChange={e => __handleSearch(e)} />
                    </div>
                </div>

                <table>
                    <thead>
                        <th>ID</th>
                        <th>name</th>
                        <th>Email</th>
                        <th>Role</th>
                    </thead>

                    {admins && admins.length !== 0 ?
                        <tbody>
                            {admins.map((admin, index) => (
                                <tr key={index}>
                                    <td><span>{index}</span></td>
                                    <td><Link to={`/admin/admins/${admin._id}`} state={{ data: admin }}>{admin.email}</Link></td>
                                    <td><span>{admin.name}</span></td>  
                                    <td>
                                        <div>
                                            {admin.role === 'Admin' ?
                                                <img
                                                    src={adminIcon}
                                                    alt='paid-icon'
                                                    className='dashboard-content-icon' />
                                            : admin.role === 'Super' ?
                                                <img
                                                    src={superAdminIcon}
                                                    alt='canceled-icon'
                                                    className='dashboard-content-icon' />
                                            : null}
                                            <span>{admin.role}</span>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    : null}
                </table>

                {admins && admins.length !== 0 ?
                    <div className='dashboard-content-footer'>
                        {pagination.map((item, index) => (
                            <span 
                                key={index} 
                                className={item === page ? 'active-pagination' : 'pagination'}
                                onClick={() => __handleChangePage(item)}>
                                    {item}
                            </span>
                        ))}
                    </div>
                : 
                    <div className='dashboard-content-footer'>
                        <span className='empty-table'>No data</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default Admins