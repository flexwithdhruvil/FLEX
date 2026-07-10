import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AppLayout from './components/AppLayout';
import Home from './pages/Home';
import Auth from './pages/Auth';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import BeamsDemo from './pages/BeamsDemo';
import Transformations from './pages/Transformations';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Main page overridden with NotFound until further notice */}
          <Route path="/" element={<NotFound />} />
          <Route path="/home" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} />
          <Route path="/beams" element={<BeamsDemo />} />
          <Route path="/transformations" element={<Transformations />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}
