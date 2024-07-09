import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {
  About,
  DawratSelection,
  Home,
  Login,
  PageNotFound,
  PrivacyPolicy,
  QuizPage,
  QuizResult,
  Register,
  SubjectSelection,
  TermsAndConditions,
} from "../pages";
import {
  AdminAds,
  AdminColleges,
  AdminExams,
  AdminLogin,
  AdminRegister,
  AdminSpecialists,
  AdminSubjects,
  AdminUsers,
  SendNotify,
  Suggestions,
} from "../pages/Dashboard";

const AppRoutes = () => {
  return (
    <Router basename="">
      <Routes>
        {/* User Routes */}

        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
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

        {/* Page Not Found */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
