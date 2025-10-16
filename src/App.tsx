import { Routes, Route, Link } from "react-router-dom";
import EventList from "./pages/EventList";
import RegistrationForm from "./pages/RegistrationForm";
import ConfirmationPage from "./pages/ConfirmationPage";
import MyRegistrationsPage from "./pages/MyRegistrationsPage";
import { Toaster } from "sonner";

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow mb-6 p-4 flex justify-between">
        <Link to="/" className="font-bold text-lg">
          Event Registration
        </Link>
        <Link to="/my-registrations" className="text-blue-600">
          My Registrations
        </Link>
      </nav>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/register/:eventId" element={<RegistrationForm />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="/my-registrations" element={<MyRegistrationsPage />} />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
