"use client";
import Link from "next/link";
import { useState } from "react";
import * as Yup from "yup";

const subscribeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  company: Yup.string().optional(),
});

export default function SubscribeForm() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    company: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSuccess("");

    try {
      await subscribeSchema.validate(form, { abortEarly: false });

      await new Promise((r) => setTimeout(r, 1000));

      setSuccess("Thank you for subscribing!");
      setForm({ name: "", surname: "", email: "", company: "" });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl">
        <h2 className="text-nexia-dark-teal-100 mb-6 text-2xl font-bold lg:text-3xl">
          Subscribe to Insights
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border-b p-2 outline-none"
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="surname"
              placeholder="Surname"
              value={form.surname}
              onChange={handleChange}
              className="w-full border-b p-2 outline-none"
            />
            {errors.surname && (
              <p className="text-sm text-red-600">{errors.surname}</p>
            )}
          </div>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border-b p-2 outline-none"
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={form.company}
              onChange={handleChange}
              className="w-full border-b p-2 outline-none"
            />
            {errors.company && (
              <p className="text-sm text-red-600">{errors.company}</p>
            )}
          </div>
        </div>

        {success && <p className="mt-4 text-green-600">{success}</p>}

        <button
          type="submit"
          className="bg-nexia-dark-teal-100 mt-6 w-[200px] px-6 py-3 text-white transition-all hover:bg-nexi-light-teal-100"
        >
          Submit
        </button>
      </form>

      <div className="mt-8">
        <p className="text-nexia-dark-teal-100 text-sm max-w-2xl">
          By submitting this subscription form you will be providing some
          personal data to Nexia Agbo Abel & Co and will need to consent to the
          way that Nexia Agbo Abel & Co processes your personal data. <Link className="font-extrabold underline"href="/privacy-policy">Click here </Link>
          to see the privacy statement, which provides information on how Nexia
          Agbo Abel & Co collects and processes your personal data.
        </p>
      </div>
    </>
  );
}
