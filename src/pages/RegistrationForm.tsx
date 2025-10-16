import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { addRegistration } from "@/store/registrationsSlice";
import { registerForEvent } from "@/api/mockApi";

const RegistrationForm: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = useSelector((state: RootState) =>
    state.events.events.find((e) => e.id === eventId)
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const isAlreadyRegistered = useSelector((state: RootState) =>
    state.registrations.registrations.some(
      (registration) =>
        registration.eventId === eventId && registration.email === form.email
    )
  );

  if (!event) {
    return <div className="p-4">Event not found.</div>;
  }

  if (isAlreadyRegistered) {
    return (
      <div className="p-4">You are already registered for this event.</div>
    );
  }

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      errs.email = "Valid email required.";
    if (!form.phone.match(/^\d{10,}$/)) errs.phone = "Valid phone required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await registerForEvent({ eventId: event.id, ...form });
    dispatch(addRegistration({ eventId: event.id, ...form }));
    setSubmitting(false);
    navigate("/confirmation", { state: { event, registration: form } });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">Register for {event.name}</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block mb-1">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
          {errors.name && (
            <div className="text-red-600 text-sm">{errors.name}</div>
          )}
        </div>
        <div>
          <label className="block mb-1">Email</label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
          {errors.email && (
            <div className="text-red-600 text-sm">{errors.email}</div>
          )}
        </div>
        <div>
          <label className="block mb-1">Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className="w-full border rounded px-2 py-1"
          />
          {errors.phone && (
            <div className="text-red-600 text-sm">{errors.phone}</div>
          )}
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
