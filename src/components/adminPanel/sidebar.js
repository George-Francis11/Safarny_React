import adminIcon from '../../assets/icons/admin.svg';
import planeIcon from '../../assets/icons/plane.svg';

const sidebar_menu = [
    {
        id: 1,
        icon: planeIcon,
        path: '/admin/trips',
        title: 'Trips',
    },
    {
        id: 2,
        icon: adminIcon,
        path: '/admin/admins',
        title: 'Admins',
    }
]

export default sidebar_menu;