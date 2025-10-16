import { Routes, Route } from "react-router-dom";
import EventList from "./pages/EventList";
import RegistrationForm from "./pages/RegistrationForm";
import ConfirmationPage from "./pages/ConfirmationPage";
import MyRegistrationsPage from "./pages/MyRegistrationsPage";
import { Toaster } from "sonner";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<EventList />} />
          <Route path="/register/:eventId" element={<RegistrationForm />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
          <Route path="/my-registrations" element={<MyRegistrationsPage />} />
        </Routes>
      </main>
      <Toaster />
    </>
  );
}

export default App;
