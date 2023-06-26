import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import PopularEvents from './components/popularevents/PopularEvents'
import Footer from './components/footer/Footer'
import Events from './components/events/Events'
import Signup from './components/signup/Signup'
import Signin from './components/signin/Signin'
import EventDetails from './components/eventdetails/EventDetails'
import EditEvent from './components/EditEvent/EditEvent';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import MyProfile from './components/myProfile/myProfile';
import UpdateProfile from './components/updateProfile/UpdateProfile';
import NotFound from './components/NotFound/NotFound';



function App() {
  const { user } = useSelector((state) => state.auth)
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <>
          <Navbar />
          <Hero />
          <PopularEvents />
         
          <Footer />
          </>
        } />
        
        <Route path="/events" element={
          <>
          <Navbar />
          <Events />
          <Footer />
          </>
        } />
        <Route path="/eventDetail/:id" element={
          <>
          <Navbar />
          <EventDetails />
          <Footer />
          </>
        } />

        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route path='/editevent/:id' element={
          user ? 
          <>
          <Navbar />
          <EditEvent />
          <Footer />
          </>
          : <Navigate to='/signin' />
        } />

        <Route path='/my-profile' element={
          user ?
          <>
          <Navbar />
          <MyProfile />
          <Footer />
          </>
          : <Navigate to='/signin' />
        }
        />

<Route path='/update-profile' element={
          user ?
          <>
          <Navbar />
          <UpdateProfile />
          <Footer />
          </>
          : <Navigate to='/signin' />
        }
        />

<Route path='*' element={
          
          <>
          <Navbar />
          <NotFound />
          <Footer />
          </>
          
        }
        />
      </Routes>
    </div>
  );
}

export default App;
