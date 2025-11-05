"use client";

import React, { useState } from "react";
import { Input } from "@/_components/a-input";
import { Textarea } from "@/_components/atoms/a-textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import useSWRMutation from "swr/mutation";
import Link from "next/link";
import * as Yup from "yup";
import { swrMutationFetcher } from "@/_lib/fetch";
import { toast } from "sonner";
import { getStrapiConfig } from "@/_lib/fetch";

const helpReasons = [
  { label: "General Inquiry", value: "general_inquiry" },
  { label: "Request For Brochure", value: "request_brochure" },
  { label: "Request For Quote", value: "request_quote" },
  { label: "Media Inquiry", value: "media_inquiry" },
  { label: "Complaint", value: "complaint" }
];

const heardAbout = [
  { label: "Web Search", value: "web_search" },
  { label: "Social Media", value: "social_media" },
  { label: "Traditional Media", value: "traditional_media" },
  { label: "Referral/ Word of Mouth", value: "referral" },
  { label: "Advertisement", value: "advertisement" },
  { label: "Event", value: "event" },
  { label: "Ai Database", value: "ai_database" },
  { label: "Other", value: "other" }
];

const contactUsSchema = Yup.object().shape({
  reason: Yup.string().required("Please select how we can help"),
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  company: Yup.string().optional(),
  phone: Yup.string().optional(),
  message: Yup.string().required("Message is required"),
  heardAbout: Yup.string().required("Please tell us where you heard about us"),
  agree: Yup.boolean().oneOf([true], "You must agree to the privacy policy"),
});

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    reason: "",
    name: "",
    email: "",
    company: "",
    phone: "",
    message: "",
    heardAbout: "",
    agree: false,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { token } = getStrapiConfig();

  const { trigger, isMutating } = useSWRMutation("/api/contacts", swrMutationFetcher);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setValidationErrors({});

    try {
      await contactUsSchema.validate(formData, { abortEarly: false });

      await trigger({
        method: 'POST',
        body: {
          data: formData, 
        },
        headers: {
          'Authorization': `Bearer ${token}`
        },
      });

      toast.success("Message sent successfully! We'll get back to you soon.");

      setFormData({
        reason: "",
        name: "",
        email: "",
        company: "",
        phone: "",
        message: "",
        heardAbout: "",
        agree: false,
      });

    } catch (err) {
      toast.dismiss();

      if (err instanceof Yup.ValidationError) {
        const errors: Record<string, string> = {};
        err.inner.forEach((error) => {
          if (error.path) {
            errors[error.path] = error.message;
          }
        });
        setValidationErrors(errors);
        
        const firstErrorField = Object.keys(errors)[0];
        if (firstErrorField) {
          const element = document.querySelector(`[name="${firstErrorField}"]`);
          element?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      } else {
        toast.error("Failed to send message. Please try again later.");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 lg:w-1/2">
      <div>
        <NativeSelect 
          name="reason" 
          onChange={handleChange} 
          value={formData.reason} 
          className="!w-full"
          aria-invalid={!!validationErrors.reason}
        >
          <NativeSelectOption value="">How can we help?</NativeSelectOption>
          {helpReasons.map((reason) => (
            <NativeSelectOption key={reason.value} value={reason.value}>
              {reason.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        {validationErrors.reason && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.reason}</p>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Input 
            name="name" 
            value={formData.name} 
            onChange={handleChange} 
            placeholder="Name" 
            aria-invalid={!!validationErrors.name}
            className={validationErrors.name ? "border-red-500" : ""}
          />
          {validationErrors.name && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
          )}
        </div>
        <div>
          <Input 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Email" 
            type="email"
            aria-invalid={!!validationErrors.email}
            className={validationErrors.email ? "border-red-500" : ""}
          />
          {validationErrors.email && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
          )}
        </div>
      </div>

      {/* Company and Phone */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <Input 
            name="company" 
            value={formData.company} 
            onChange={handleChange} 
            placeholder="Company" 
            aria-invalid={!!validationErrors.company}
            className={validationErrors.company ? "border-red-500" : ""}
          />
          {validationErrors.company && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.company}</p>
          )}
        </div>
        <div>
          <Input 
            name="phone" 
            value={formData.phone} 
            onChange={handleChange} 
            placeholder="Phone" 
            aria-invalid={!!validationErrors.phone}
            className={validationErrors.phone ? "border-red-500" : ""}
          />
          {validationErrors.phone && (
            <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
          )}
        </div>
      </div>

      {/* Message */}
      <div>
        <Textarea
          name="message"
          placeholder="Message"
          className={`min-h-[200px] rounded-xl !w-full border-nexia-dark-teal-100 shadow-none bg-gray-100 placeholder:text-nexia-gray placeholder:font-medium placeholder:text-lg ${
            validationErrors.message ? "border-red-500" : ""
          }`}
          rows={6}
          value={formData.message}
          onChange={handleChange}
          aria-invalid={!!validationErrors.message}
        />
        {validationErrors.message && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
        )}
      </div>

      {/* Heard About Us */}
      <div>
        <NativeSelect 
          name="heardAbout" 
          onChange={handleChange} 
          value={formData.heardAbout}
          aria-invalid={!!validationErrors.heardAbout}
        >
          <NativeSelectOption value="">Where did you hear about us?</NativeSelectOption>
          {heardAbout.map((item) => (
            <NativeSelectOption key={item.value} value={item.value}>
              {item.label}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        {validationErrors.heardAbout && (
          <p className="text-red-500 text-sm mt-1">{validationErrors.heardAbout}</p>
        )}
      </div>

      {/* Privacy Policy Agreement */}
      <div className="space-y-3">
        <p className="text-sm font-bold text-nexia-gray">
          By submitting this form, you consent to how Nexia will process your
          personal data.
        </p>

        <div className="flex flex-col space-y-2">
          <p className="text-sm font-bold text-nexia-gray">
            Do you agree to Nexia Agbo & Co processing your personal data?
          </p>
          <div>
            <label className="flex items-center text-sm text-nexia-gray">
              <input
                type="checkbox"
                name="agree"
                checked={formData.agree}
                onChange={handleChange}
                className={`accent-nexia-light-teal-100 !rounded-full w-4 h-4 mr-3 ${
                  validationErrors.agree ? "ring-2 ring-red-500" : ""
                }`}
                aria-invalid={!!validationErrors.agree}
              />
              I agree to the{" "}
              <Link 
                href="/privacy-policy" 
                className="mx-1 underline font-bold text-nexia-dark-teal-100 hover:text-nexia-dark-teal-200 transition-colors"
              >
                privacy policy
              </Link>
            </label>
            {validationErrors.agree && (
              <p className="text-red-500 text-sm mt-1">{validationErrors.agree}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <button
          disabled={isMutating}
          type="submit"
          className="rounded-full border border-nexia-dark-teal-100 bg-gray-100 px-8 py-2 font-bold text-nexia-dark-teal-100 hover:bg-nexia-light-teal-50 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-md active:scale-95"
        >
          {isMutating ? (
            <span className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-nexia-dark-teal-100 border-t-transparent rounded-full animate-spin" />
              Submitting...
            </span>
          ) : (
            "Submit"
          )}
        </button>
      </div>
    </form>
  );
};

export default ContactForm;