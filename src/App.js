import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Home from "./pages/home/Home";
import List from "./pages/list/List";
import Dashboard from "./pages/AdminPanel/dashboard/Dashboard";
import Admins from "./pages/AdminPanel/admins/Admins";
import Trips from "./pages/AdminPanel/trips/Trips";
import Admin from "./pages/AdminPanel/admin/Admin";
import LoginForm from "./pages/AdminPanel/loginForm/LoginForm";
import Landing from "./pages/landing/Landing";
import "bootstrap/dist/css/bootstrap.min.css";
import Trip from "./pages/trip/Trip";
import AdminForm from "./components/adminPanel/adminForm/AdminForm";
import TripShow from "./pages/AdminPanel/tripShow/TripShow";
import TripForm from "./components/adminPanel/tripForm/TripForm";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing/>}/>
        <Route path="/trips" element={<List/>}/>
        <Route path="/trips/:id" element={<Trip/>}/>
        <Route path="/admin" element={<Dashboard />}>
          <Route path="admins" element={<Admins />} />
          <Route path="admins/:id" element={<Admin />} />
          <Route path="trips" element={<Trips />} />
          <Route path="trips/:id" element={<TripShow />} />
          <Route path="trips/new" element={<TripForm/>} />
          <Route path="login" element={<LoginForm />} />
          <Route path="admins/new" element={<AdminForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



