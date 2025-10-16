import { Link, useLocation } from "react-router-dom";
import { CalendarDays } from "lucide-react";

export const Navbar = () => {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-3 flex justify-between items-center">
        <Link
          to="/"
          className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition-colors"
        >
          <CalendarDays className="text-blue-600" size={22} />
          <span className="font-semibold text-lg">Event Registration</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className={`text-sm font-medium transition-colors ${
              location.pathname === "/"
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            Events
          </Link>
          <Link
            to="/my-registrations"
            className={`flex items-center gap-1 text-sm font-medium transition-colors ${
              location.pathname === "/my-registrations"
                ? "text-blue-600"
                : "text-gray-600 hover:text-blue-600"
            }`}
          >
            My Registrations
          </Link>
        </div>
      </div>
    </nav>
  );
};
