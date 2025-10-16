import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";

const MyRegistrationsPage: React.FC = () => {
  const registrations = useSelector(
    (state: RootState) => state.registrations.registrations
  );
  const events = useSelector((state: RootState) => state.events.events);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">My Registrations</h2>
      {registrations.length === 0 ? (
        <div>No registrations yet.</div>
      ) : (
        <ul className="space-y-4">
          {registrations.map((reg, idx) => {
            const event = events.find((e) => e.id === reg.eventId);
            return event ? (
              <li key={idx} className="bg-white rounded shadow p-4">
                <div className="font-semibold">
                  {event.name} ({event.date}, {event.location})
                </div>
                <div>Name: {reg.name}</div>
                <div>Email: {reg.email}</div>
                <div>Phone: {reg.phone}</div>
              </li>
            ) : null;
          })}
        </ul>
      )}
    </div>
  );
};

export default MyRegistrationsPage;
