import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login'
import Plan from '../pages/Plan/Plan';
import PlanForm from '../pages/PlanForm/PlanForm';
import Class from '../pages/Class/Class';
import ClassForm from '../pages/ClassForm/ClassForm'
import Timeline from '../pages/Timeline/Timeline';
import StartLesson from '../pages/StartLesson/StartLesson';
import Navbar from '../components/sidebar/Sidebar';
import Header from '../components/Header/Header';
import People from '../pages/People/People';
import PeopleForm from '../pages/PeopleForm/PeopleForm';
import Result from '../pages/Result/Result';
import StudentResult from '../pages/StudentResult/StudentResult';
import PostResult from '../pages/PostResult/PostResult';
import PrivateRoute from '../components/PrivateRoutes/PrivateRoutes';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={
          <>
            <Header />
            <Navbar />
            <Routes>
              <Route path="/" element={<PrivateRoute element={<Home />} />} />
              <Route path="/plan" element={<PrivateRoute element={<Plan />} />} />
              <Route path="/planForm" element={<PrivateRoute element={<PlanForm />} />} />
              <Route path="/planForm/:id" element={<PrivateRoute element={<PlanForm />} />} />
              <Route path="/class" element={<PrivateRoute element={<Class />} />} />
              <Route path="/classform" element={<PrivateRoute element={<ClassForm />} />} />
              <Route path="/classform/:id" element={<PrivateRoute element={<ClassForm />} />} />
              <Route path="/timeline" element={<PrivateRoute element={<Timeline />} />} />
              <Route path="/startlesson" element={<PrivateRoute element={<StartLesson />} />} />
              <Route path="/people" element={<PrivateRoute element={<People />} />} />
              <Route path="/peopleform/:person" element={<PrivateRoute element={<PeopleForm />} />} />
              <Route path="/peopleform/:person/:id" element={<PrivateRoute element={<PeopleForm />} />} />
              <Route path="/result" element={<PrivateRoute element={<Result />} />} />
              <Route path="/result/:id" element={<PrivateRoute element={<StudentResult />} />} />
              <Route path="/postResult" element={<PrivateRoute element={<PostResult />} />} />
            </Routes>
          </>
        } />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
