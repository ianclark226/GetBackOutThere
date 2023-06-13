import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navbar/Navbar'
import Hero from './components/hero/Hero'
import PopularEvents from './components/popularevents/PopularEvents'
import FeaturedEvents from './components/featuredevents/FeaturedEvents'
import Footer from './components/footer/Footer'
import Events from './components/events/Events'
import Signup from './components/signup/Signup'
import Signin from './components/signin/Signin'
import EventDetails from './components/eventdetails/EventDetails'

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={
          <>
          <Navbar />
          <Hero />
          <PopularEvents />
          <FeaturedEvents />
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

      </Routes>
    </div>
  );
}

export default App;
