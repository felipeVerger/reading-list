import { Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Home from './pages/Home';
import PrivateRoutes from './utils/ProtectedRoutes';

function App() {
  return (
    <Routes>
      <Route element={<PrivateRoutes/>}>
        <Route path='/' element={<Home/>}/>
      </Route>
      <Route path='/auth' element={<Auth/>}/>
    </Routes>
  )
}

export default App
