import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Game from './Pages/Game';
import Header from './Components/Header/Header';
import Platform from './Pages/Platform';
import Upcoming from './Pages/Upcoming';
import Login from './Pages/Login/Login';
import Results from './Pages/Results';
import Favourites from './Pages/Favourites';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export function NavbarLayout() {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}

function App() {
  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Routes>
          <Route element={<NavbarLayout />}>
            <Route exact path='/' element={<Home />} />
            <Route path=':id' element={<Game />} />
            <Route path='/platform/:platform' element={<Platform />} />
            <Route path='/Upcoming' element={<Upcoming />} />
            <Route path='/Results/:search' element={<Results />} />
            <Route path='/Favorites' element={<Favourites />} />
          </Route>

          <Route path='/login' element={<Login />} />
        </Routes>
      </Router>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
      />
      {/* Same as */}
      <ToastContainer />
    </AuthContext.Provider>
  );
}

export default App;
