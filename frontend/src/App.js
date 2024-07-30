import React, { lazy, Suspense } from 'react';


//-------------- Rotuers setup
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'

//------------ Pages routes
import Spinner from './components/SpinnerComp';
const Home = lazy(() => import('./pages/HomePage'))
const Login = lazy(() => import('./pages/LoginPage'))
const Logout = lazy(() => import('./pages/LogoutPage'))



function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ----------- Home Page  */}
        <Route path='/' element={
          <Suspense fallback={<Spinner/>} >
            <Home />
          </Suspense>
        } />
        {/* ----------- Login Page  */}
        <Route path='/login' element={
          <Suspense fallback={<Spinner/>} >
            <Login />
          </Suspense>
        } />
        {/* ----------- Logout Page  */}
        <Route path='/logout' element={
          <Suspense fallback={<Spinner/>} >
            <Logout />
          </Suspense>
        } />


      </Routes>
      <Toaster />
    </BrowserRouter>
     
  );
}

export default App;
