import React, { lazy, Suspense } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';
import { Logo } from './Logo';

//-------------- Rotuers setup
import {BrowserRouter,Route,Routes} from 'react-router-dom'

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
    </BrowserRouter>
     
  );
}

export default App;
