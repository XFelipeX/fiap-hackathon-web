import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login'
import Plan from '../pages/Plan/Plan';
import PlanForm from '../pages/PlanForm/PlanForm';
import Class from '../pages/Class/Class';
import Timeline from '../pages/Timeline/Timeline';
import StartLesson from '../pages/StartLesson/StartLesson';
import Navbar from '../components/sidebar/Sidebar';
import Person from '../pages/Person/Person';
import Result from '../pages/Result/Result';
import StudentResult from '../pages/StudentResult/StudentResult';
import PostResult from '../pages/PostResult/PostResult';

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/plan" element={<Plan />} />
        <Route path="/planForm" element={<PlanForm />} />
        <Route path="/planForm/:id" element={<PlanForm />} />
        <Route path="/class" element={<Class />} />
        <Route path="/timeline" element={<Timeline />} />
        <Route path="/startlesson" element={<StartLesson />} />
        <Route path="/persons" element={<Person />} />
        <Route path="/result" element={<Result />} />
        <Route path="/result/:id" element={<StudentResult />} />
        <Route path="/postResult" element={<PostResult />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
