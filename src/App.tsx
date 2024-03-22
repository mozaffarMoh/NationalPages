import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Home from "./pages/Home/Home";
import SubjectSelection from "./pages/SubjectSelection/SubjectSelection";
import QuizPage from "./pages/QuizPage/QuizPage";
import DawratSelection from "./pages/DawratSelection/DawratSelection";
import QuizResult from "./pages/QuizResult/QuizResult";
import AdminLogin from "./pages/Dashboard/AdminLogin/AdminLogin";
import AdminUsers from "./pages/Dashboard/AdminUsers/AdminUsers";
import AdminRegister from "./pages/Dashboard/AdminRegister/AdminRegister";
import SendNotify from "./pages/Dashboard/SendNotify/SendNotify";
import AdminAds from "./pages/Dashboard/AdminAds/AdminAds";
import Suggestions from "./pages/Dashboard/Suggestions/Suggestions";
import AdminColleges from "./pages/Dashboard/AdminColleges/AdminColleges";
import AdminSpecialists from "./pages/Dashboard/AdminSpecialists/AdminSpecialists";
import AdminSubjects from "./pages/Dashboard/AdminSubjects/AdminSubjects";
import AdminExams from "./pages/Dashboard/AdminExams/AdminExams";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {/* User Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/subject-selection" element={<SubjectSelection />} />
          <Route path="/dawrat-selection" element={<DawratSelection />} />
          <Route path="/quiz-page" element={<QuizPage />} />
          <Route path="/quiz-result" element={<QuizResult />} />

          {/* Admin Routes */}
          <Route path="/dashboard/login" element={<AdminLogin />} />
          <Route path="/dashboard/users" element={<AdminUsers />} />
          <Route path="/dashboard/colleges" element={<AdminColleges />} />
          <Route path="/dashboard/specialists" element={<AdminSpecialists />} />
          <Route path="/dashboard/subjects" element={<AdminSubjects />} />
          <Route path="/dashboard/exams" element={<AdminExams />} />
          <Route path="/dashboard/ads" element={<AdminAds />} />
          <Route path="/dashboard/suggestions" element={<Suggestions />} />
          <Route path="/dashboard/send-notify" element={<SendNotify />} />
          <Route path="/dashboard/create-account" element={<AdminRegister />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
