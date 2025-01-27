import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Plan from '../pages/Plan/Plan';
import PlanForm from '../pages/PlanForm/PlanForm';
import Class from '../pages/Class/Class';
import Timeline from '../pages/Timeline/Timeline';
import StartClass from '../pages/StartClass/StartClass';
import Navbar from '../components/sidebar/Sidebar';
const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/planForm" element={<PlanForm />} />
        <Route path="/planForm/:id" element={<PlanForm />} />
        <Route path="/class" element={<Class />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/startclass" element={<StartClass />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
