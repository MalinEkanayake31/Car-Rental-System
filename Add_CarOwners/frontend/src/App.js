import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./Pages/Home";
import CarRentPage from "./Components/CarRentPage";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Feedback from "./Pages/Feedback";
import SideBar from "./Components/SideBar";
import OwnerDetails from "./Pages/OwnerDetails";
import AddOwner from "./Pages/AddOwner";
import ViewFeedback from "./Pages/ViewFeedback";
import AddcarDashboard from "./Components/AddcarDashboard";
import VehicleDetails from "./Pages/VehicleDetails";
import AddVehicle from "./Pages/AddVehicle";
import { DisplayFeedback } from "./Pages/DisplayFeedback";
import Message from "./Pages/Message";
import { UpdateVehicle } from "./Pages/UpdateVehicle";
import Searchpage from "./Pages/Searchpage";
import Carpurchasemessagepage from "./Pages/Carpurchasemessagepage";
import Usersidebar from "./Components/Usersidebar";
import Bookingdashbord from "./Pages/Bookingdashbord";
import Usermsg from "./Pages/usermsg";
import Addcar from "./Pages/Addcar";
import UserDashboard from "./Pages/UserDashboard";
import { UpdateOwner } from "./Pages/UpdateOwner";
import Paymentpage from "./Pages/Paymentpage";
import Userdetail from "./Pages/Userdetail";
import OwnerDashboard from "./Pages/OwnerDashboard";
import Updateuserdetails from "./Pages/Updateuserdetails";
import Contact from "./Pages/Contact";
import AboutUspage from "./Pages/AboutUspage";
import Privacy from "./Pages/Privacy";
import Termsandconditions from "./Pages/Termsandconditions";



function App() {
  return (
    
    <Router>
      <Routes>
        {/* Main Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/carpage" element={<CarRentPage />} />
        <Route path="/carpage/carrentmessage" element={<Carpurchasemessagepage />} />
        <Route path="/Signup" element={<SignUp />} />
        <Route path="/search" element={<Searchpage />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/feedback" element={<Feedback />} />
        <Route path="/admin/*" element={<AdminLayout />} />
        <Route path="/Addcar/*" element={<AddcarLayout />} />
        <Route path="/userdashbord/*" element={< UserLayout/>} />
        <Route path="/displayfeedback" element={<DisplayFeedback />} />
        <Route path="/payment" element={<Paymentpage />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacypolicy" element={<Privacy/>} />
        <Route path="/termsncondition" element={<Termsandconditions/>} />
        <Route path="/userpro" element={<Userdetail />} />
        <Route path="/userpro/upd" element={<Updateuserdetails />} />
        <Route path="/aboutus" element={<AboutUspage />} />
        
      </Routes>
    </Router>
  );
}

function AdminLayout() {
  return (
    <div className="flex">
      <SideBar />
      <div className="flex-grow">
        <Routes>
          <Route path="add-owner" element={<AddOwner />} />
          <Route path="owner-details" element={<OwnerDetails />} />
          <Route path="contactmsg" element={<ViewFeedback />} />
          <Route path="update-owner/:id" element={<UpdateOwner/>} />
          <Route path="/" element={<OwnerDashboard/>} />
        </Routes>
      </div>
    </div>
  );
}

function AddcarLayout() {
  return (
    <div className="flex">
      <AddcarDashboard />
      <div className="flex-grow">
        <Routes>
          <Route path="vehicle-details" element={<VehicleDetails />} />
          <Route path="add-vehicle" element={<AddVehicle />} />
          <Route path="message" element={<Message/>} />
          <Route path="update-vehicle/:id" element={<UpdateVehicle/>} />
          <Route path="/" element={<Addcar/>}/>
        </Routes>
      </div>
    </div>
  );
}

function UserLayout(){
  return(
    <div className="flex">
      <Usersidebar/>
      <div className="flex-grow">
        <Routes>
            <Route path="dash" element={<UserDashboard />} />
            <Route path="booking" element={<Bookingdashbord />} />
            <Route path="usermsg" element={<Usermsg />} />
          </Routes>
      </div>
    </div>
  )
}

export default App;