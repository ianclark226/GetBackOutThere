import "./App.css";
import { Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar/Navbar.jsx';
import Hero from './components/Hero/Hero';
import PopularEvents from './components/PopularEvents/PopularEvents';
import FeaturedEvents from './components/FeaturedEvents/FeaturedEvents';
import Newsletter from './components/Newsletter/Newsletter';
import Footer from './components/Footer/Footer';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Events from './components/Events/Events';
import EventDetails from './components/EventDetails/EventDetails';

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <PopularEvents />
              <FeaturedEvents />
              <Newsletter />
              <Footer />
            </>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />

        <Route
          path="/events"
          element={
            <>
              <Navbar />
              <Events />
              <Footer />
            </>
          }
        />
        <Route
          path="/eventDetail/:id"
          element={
            <>
              <Navbar />
              <EventDetails />
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
