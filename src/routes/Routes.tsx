import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Plan from '../pages/Plan/Plan'
import Class from '../pages/Class/Class'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/plan" element={<Plan/>} />
        <Route path="/class" element={<Class/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes
