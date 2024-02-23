import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//Pages and components
import Home from './pages/Home'
import Profile from './pages/Profile'
import Statement from './pages/Statement'
import Transaction from './pages/Transaction'
import Setting from './pages/Setting'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import LoginCard from './pages/LoginCard'
import Pay from './pages/Pay'
import Print from './pages/Print'
import RegisterCard from './pages/RegisterCard'

function App() {
const { user } = useAuthContext()

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route 
              path="/" 
              element={!user ? <Login /> : <Navigate to='/home' />}
            />
            <Route 
              path="/home" 
              element={user ? <Home /> : <Navigate to='/' />} 
            />
            <Route 
              path="/profile" element={user ? <Profile /> : <Navigate to='/' />} 
            />
            <Route 
              path="/statement" element={user ? <Statement />  : <Navigate to='/' />} 
            />
            <Route 
              path="/transaction" element={user ? <Transaction /> : <Navigate to='/' />} 
            />
            <Route 
              path="/profile/setting" element={user ? <Setting /> : <Navigate to='/' />} 
            />
            <Route 
              path="/profile/card" element={user ? <RegisterCard /> : <Navigate to='/' />} 
            />
            <Route 
              path="/statement/pay" element={user ? <Pay /> : <Navigate to='/' />} 
            />
            <Route 
              path="/statement/print" element={user ? <Print /> : <Navigate to='/' />} 
            />
            <Route 
              path="/card"
              element={!user ? <LoginCard /> : <Navigate to='/home' />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
