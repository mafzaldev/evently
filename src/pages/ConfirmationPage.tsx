import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  CheckCircle2,
  CalendarDays,
  MapPin,
  User,
  Mail,
  Phone,
} from "lucide-react";

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, registration } = location.state || {};

  if (!event || !registration)
    return (
      <div className="max-w-md mx-auto mt-20 p-6 text-center bg-white rounded-2xl shadow-md border border-gray-100">
        <p className="text-gray-700 font-medium">Invalid confirmation.</p>
        <button
          onClick={() => navigate("/")}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition cursor-pointer"
        >
          Back to Events
        </button>
      </div>
    );

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-2xl shadow-md border border-gray-100 text-gray-800">
      <div className="flex flex-col items-center justify-center gap-2 mb-4">
        <CheckCircle2 className="text-green-600" size={64} />
        <h2 className="text-xl font-bold">Registration Confirmed!</h2>
      </div>

      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Event Details</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <CalendarDays size={16} className="text-blue-500" />
            <span>{event.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} className="text-rose-500" />
            <span>
              {event.date}, {event.location}
            </span>
          </div>
        </div>
      </div>
      <div className="mb-6">
        <h3 className="font-semibold text-gray-700 mb-2">Your Details</h3>
        <div className="space-y-1 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <User size={16} className="text-gray-500" />
            <span>{registration.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={16} className="text-gray-500" />
            <span>{registration.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={16} className="text-gray-500" />
            <span>{registration.phone}</span>
          </div>
        </div>
      </div>
      <button
        onClick={() => navigate("/")}
        className="
          w-full py-2.5
          bg-blue-600 text-white text-sm font-medium rounded-lg
          hover:bg-blue-700 active:scale-[0.98]
          transition-all duration-150 cursor-pointer
        "
      >
        Back to Events
      </button>
    </div>
  );
};

export default ConfirmationPage;
