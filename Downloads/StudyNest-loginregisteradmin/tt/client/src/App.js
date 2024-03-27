import {
  BrowserRouter,
  Navigate,
  Routes,
  Route,
  Outlet,
} from 'react-router-dom'
import Dashboard from './pages/dashboard'
import AHome from './pages/Ahome'
import BHome from './pages/Bhome'
import Login from './pages/login'
import Register from './pages/register'
import { useSelector } from 'react-redux'
import Userrole from './pages/userrole'
import AAssign from './pages/Aassign'
import BAssign from './pages/Bassign'
import Profile from './pages/profile'
import ACalender from './pages/Acalender'
import BCalender from './pages/Bcalender'
import AReview from './pages/Areview'
import BReview from './pages/Breview'

const PrivateRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{isAuth ? <Outlet /> : <Navigate to='/login' />}</>
}

const RestrictedRoutes = () => {
  const { isAuth } = useSelector((state) => state.auth)

  return <>{!isAuth ? <Outlet /> : <Navigate to='/dashboard' />}</>
}

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route path='/Aassign' exact element={<AAssign />} />
        <Route element={<PrivateRoutes />}>
        {/* <Route path='/Ahome' element={<AHome />} /> */}
        <Route path='/Bhome' element={<BHome />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/admin' element={<Userrole />} />
          {/* <Route path='/Aassign' exact element={<AAssign />} /> */}
          <Route path='/Bassign' exact element={<BAssign />} />
          <Route path='/Acalender' exact element={<ACalender />} />
          <Route path='/Bcalender' exact element={<BCalender />} />
          <Route path='/profile' exact element={<Profile />} />
          <Route path='/Areview' exact element={<AReview />} />
          <Route path='/Breview' exact element={<BReview />} />
        </Route>

        <Route element={<RestrictedRoutes />}>
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
