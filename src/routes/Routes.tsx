import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Plan from '../pages/Plan/Plan'
import PlanForm from '../pages/PlanForm/PlanForm'
import Class from '../pages/Class/Class'
import Timeline from '../pages/Timeline/Timeline'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/plan" element={<Plan/>} />
        <Route path="/planForm" element={<PlanForm/>} />
        <Route path="/planForm/:id" element={<PlanForm/>} />
        <Route path="/class" element={<Class/>} />
        <Route path="/timeline" element={<Timeline/>} />
      </Routes>
    </Router>
  );
};

export default AppRoutes
