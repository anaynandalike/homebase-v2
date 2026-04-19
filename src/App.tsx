import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useUserStore } from "@/store/userStore";
import { Navbar } from "@/components/Navbar";
import { ToastContainer } from "@/components/Toast";
import Onboarding from "@/pages/Onboarding";
import Dashboard from "@/pages/Dashboard";
import Matching from "@/pages/Matching";
import Compass from "@/pages/Compass";
import Tracker from "@/pages/Tracker";
import HomeLink from "@/pages/HomeLink";
import Messages from "@/pages/Messages";
import Profile from "@/pages/Profile";

function AppRoutes() {
  const location = useLocation();
  const onboardingComplete = useUserStore((s) => s.user.onboardingComplete);

  const isOnboarding = location.pathname === "/onboarding";

  return (
    <>
      {!isOnboarding && onboardingComplete && <Navbar />}
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route
            path="/dashboard"
            element={
              onboardingComplete ? <Dashboard /> : <Navigate to="/onboarding" />
            }
          />
          <Route
            path="/matching"
            element={
              onboardingComplete ? <Matching /> : <Navigate to="/onboarding" />
            }
          />
          <Route
            path="/compass"
            element={
              onboardingComplete ? <Compass /> : <Navigate to="/onboarding" />
            }
          />
          <Route
            path="/tracker"
            element={
              onboardingComplete ? <Tracker /> : <Navigate to="/onboarding" />
            }
          />
          <Route
            path="/home-link"
            element={
              onboardingComplete ? <HomeLink /> : <Navigate to="/onboarding" />
            }
          />
          <Route
            path="/messages"
            element={
              onboardingComplete ? <Messages /> : <Navigate to="/onboarding" />
            }
          />
          <Route
            path="/profile"
            element={
              onboardingComplete ? <Profile /> : <Navigate to="/onboarding" />
            }
          />
          <Route
            path="*"
            element={
              <Navigate to={onboardingComplete ? "/dashboard" : "/onboarding"} />
            }
          />
        </Routes>
      </AnimatePresence>
      <ToastContainer />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
