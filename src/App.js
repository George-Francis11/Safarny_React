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
import Trip from "./pages/AdminPanel/trip/Trip";
import Admin from "./pages/AdminPanel/admin/Admin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/trips" element={<List/>}/>
        <Route path="/trips/:id" element={<Trip/>}/>
        <Route path="/admin" element={<Dashboard />}>
          <Route path="admins" element={<Admins />} />
          <Route path="admins/:id" element={<Admin />} />
          <Route path="trips" element={<Trips />} />
          <Route path="trips/:id" element={<Trip />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;



