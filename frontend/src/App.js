import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Listings from './pages/Listings';
import ListingDetail from './pages/ListingDetail';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import NotFound from './pages/NotFound';
import Navbar from './components/Navbar';

import { Provider } from 'react-redux';
import store from './store';

import './sass/main.scss'

const App = () => {
  return (
    <Provider store={store}>
      <Navbar />
      <Router>
        <Routes>
            <Route exact path='/' component={Home} />
            <Route exact path='/about' component={About} />
            <Route exact path='/contact' component={Contact} />
            <Route exact path='/listings' component={Listings} />
            <Route exact path='/listings/:id' component={ListingDetail} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/signup' component={SignUp} />
            <Route component={NotFound} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
