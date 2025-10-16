import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/store/store";
import { addRegistration } from "@/store/registrationsSlice";
import { registerForEvent } from "@/api/mockApi";
import { toast } from "sonner";
import InputField from "@/components/InputField";
import { LoaderCircle } from "lucide-react";

const RegistrationForm: React.FC = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const event = useSelector((state: RootState) =>
    state.events.events.find((e) => e.id === eventId)
  );
  const loading = useSelector((state: RootState) => state.events.loading);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submitting, setSubmitting] = useState(false);

  const isAlreadyRegistered = useSelector((state: RootState) =>
    state.registrations.registrations.some(
      (r) => r.eventId === eventId && r.email === form.email
    )
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-32">
        <LoaderCircle className="animate-spin" size={36} />
      </div>
    );
  }

  if (!event) {
    return <div className="p-4">Event not found.</div>;
  }

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!form.name.trim()) errs.name = "Name is required.";
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/))
      errs.email = "Valid email is required.";
    if (!form.phone.match(/^\d{10,}$/)) errs.phone = "Valid phone is required.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isAlreadyRegistered) {
      toast("You are already registered for this event.");
      return;
    }
    if (!validate()) return;
    setSubmitting(true);
    await registerForEvent({ eventId: event.id, ...form });
    dispatch(addRegistration({ eventId: event.id, ...form }));
    setSubmitting(false);
    navigate("/confirmation", { state: { event, registration: form } });
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-bold mb-6">Register for {event.name}</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <InputField
          label="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
        />
        <InputField
          label="Email"
          name="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
        />
        <InputField
          label="Phone"
          name="phone"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
        />
        <button
          type="submit"
          className="w-full mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer"
          disabled={submitting}
        >
          {submitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default RegistrationForm;
