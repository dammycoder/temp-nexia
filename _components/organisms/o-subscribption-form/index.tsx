"use client";
import Link from "next/link";
import { useState, memo } from "react";
import * as Yup from "yup";
import useSWRMutation from "swr/mutation";
import { swrMutationFetcher } from "@/_lib/fetch";
import { getStrapiConfig } from "@/_lib/fetch";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const subscribeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  company: Yup.string().optional(),
});

function SubscribeForm() {
  const [form, setForm] = useState({
    name: "",
    surname: "",
    email: "",
    company: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { token } = getStrapiConfig();
  
  const { trigger, isMutating } = useSWRMutation("/api/subscribers", swrMutationFetcher);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    
    if (errors[e.target.name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[e.target.name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      await subscribeSchema.validate(form, { abortEarly: false });

      await trigger({
        method: 'POST',
        body: {
          data: form,
        },
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      toast.success("Thank you for subscribing!");
      setForm({ name: "", surname: "", email: "", company: "" });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const newErrors: Record<string, string> = {};
        err.inner.forEach((e) => {
          if (e.path) newErrors[e.path] = e.message;
        });
        setErrors(newErrors);
      } else {
        toast.error("Failed to subscribe. Please try again later.");
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
              disabled={isMutating}
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
              disabled={isMutating}
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
              disabled={isMutating}
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
              disabled={isMutating}
            />
            {errors.company && (
              <p className="text-sm text-red-600">{errors.company}</p>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={isMutating}
          className="bg-nexia-dark-teal-100 mt-6 flex w-[200px] items-center justify-center px-6 py-3 text-white transition-all hover:bg-nexi-light-teal-100 disabled:opacity-50"
        >
          {isMutating ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Subscribing...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </form>

      <div className="mt-8">
        <p className="text-nexia-dark-teal-100 max-w-2xl text-sm">
          By submitting this subscription form you will be providing some
          personal data to Nexia Agbo Abel & Co and will need to consent to the
          way that Nexia Agbo Abel & Co processes your personal data. <Link className="font-extrabold underline" href="/privacy-policy">Click here </Link>
          to see the privacy statement, which provides information on how Nexia
          Agbo Abel & Co collects and processes your personal data.
        </p>
      </div>
    </>
  );
}

export default memo(SubscribeForm);