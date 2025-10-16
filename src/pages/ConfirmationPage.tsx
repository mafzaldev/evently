import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ConfirmationPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, registration } = location.state || {};

  if (!event || !registration)
    return <div className="p-4">Invalid confirmation.</div>;

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Registration Confirmed!</h2>
      <div className="mb-4">
        <div className="font-semibold">Event:</div>
        <div>
          {event.name} ({event.date}, {event.location})
        </div>
      </div>
      <div className="mb-4">
        <div className="font-semibold">Your Details:</div>
        <div>Name: {registration.name}</div>
        <div>Email: {registration.email}</div>
        <div>Phone: {registration.phone}</div>
      </div>
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        onClick={() => navigate("/")}
      >
        Back to Events
      </button>
    </div>
  );
};

export default ConfirmationPage;
