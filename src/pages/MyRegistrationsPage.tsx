import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "@/store/store";
import { CalendarDays, MapPin, User, Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const MyRegistrationsPage: React.FC = () => {
  const registrations = useSelector(
    (state: RootState) => state.registrations.registrations
  );
  const events = useSelector((state: RootState) => state.events.events);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">My Registrations</h1>
      {registrations.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 text-center text-gray-600">
          <p className="mb-2">You haven't registered for any events yet.</p>
          <p className="text-sm text-gray-500">
            <Link to="/" className="text-blue-600 underline">
              Go explore
            </Link>{" "}
            some events and register!
          </p>
        </div>
      ) : (
        <ul className="space-y-4">
          {registrations.map((reg, idx) => {
            const event = events.find((e) => e.id === reg.eventId);
            return (
              event && (
                <li
                  key={idx}
                  className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 transition-all duration-200 hover:shadow-md hover:scale-[1.01]"
                >
                  <div className="mb-3">
                    <div className="font-semibold text-gray-800 text-lg mb-1">
                      {event.name}
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1.5">
                        <CalendarDays size={16} className="text-blue-500" />
                        {event.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={16} className="text-rose-500" />
                        {event.location}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm text-gray-700">
                    <div className="flex items-center gap-2">
                      <User size={15} className="text-gray-500" />
                      <span>{reg.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={15} className="text-gray-500" />
                      <span>{reg.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={15} className="text-gray-500" />
                      <span>{reg.phone}</span>
                    </div>
                  </div>
                </li>
              )
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MyRegistrationsPage;
