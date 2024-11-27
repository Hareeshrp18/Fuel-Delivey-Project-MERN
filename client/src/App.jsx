import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Homepage from './Components/Homepage';
import Usersignup from './Components/User-page/Usersignup';
import Userlogin from './Components/User-page/Userlogin';
import Userdashboard from './Components/User-page/Userdashbroad';
import Placeorder from './Components/order-page/Placeorder';
import Orderhistory from './Components/order-page/Orderhistory';
import Orderresult from './Components/order-page/Orderresult';
import Fssignup from './Components/Fuel-station/Fssignup';
import Fslogin from './Components/Fuel-station/Fslogin';
import Fuelstationdashboard from './Components/Fuel-station/Fuelstationdashboard';
import Dpsignup from './Components/Delivery-partner/Dpsignup';
import Dplogin from './Components/Delivery-partner/Dplogin';
import Dpdashboard from './Components/Delivery-partner/Dpdashboard';
import Notfound from './Components/notfound/Notfound';


const App = () => {
    return (
        <div className='mainContainer'>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/usersignup" element={<Usersignup />} />
                <Route path="/userlogin" element={<Userlogin />} />
                <Route path="/userdashboard" element={<Userdashboard/>}/>
                <Route path="/orderpage" element={<Placeorder />} />
                <Route path="/orderresult" element={<Orderresult/>} />
                <Route path="/orderhistory" element={<Orderhistory />}/>
                <Route path="/fssignup" element={<Fssignup/>} />
                <Route path="/fslogin" element={<Fslogin/>}/>
                <Route path='/fuelstationdashboard' element={<Fuelstationdashboard/>}/>
                <Route path="/dpsignup" element={<Dpsignup />} />
                <Route path="/dplogin" element={<Dplogin />} />
                <Route path="/dpdashboard" element={<Dpdashboard/>} />
                <Route path="*" element={<Notfound/>}/>
            </Routes>
            
        </div>
    );
};

export default App;
