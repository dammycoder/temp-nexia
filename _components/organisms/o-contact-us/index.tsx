"use client";

import React, { useState } from "react";
import { Input } from "@/_components/a-input";
import { Textarea } from "@/_components/atoms/a-textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import useSWRMutation from "swr/mutation";
import Link from "next/link";
import * as Yup from "yup";
import { swrMutationFetcher} from "@/_lib/fetch";
// import { toast } from "sonner"

const helpReasons = [
    "General Inquiry",
    "Request For Brochure",
    "Request For Quote",
    "Media Inquiry",
    "Complaint"
];

const heardAbout = [
    "Web Search",
    "Social Media",
    "Traditional Media",
    "Referral/ Word of Mouth",
    "Ai Database",
    "Other"
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
        locationId: "",
        agree: false,
    });

    const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

    const { trigger, isMutating  } = useSWRMutation("/api/contact", swrMutationFetcher);

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
            // Validate form data
            await contactUsSchema.validate(formData, { abortEarly: false });

            // Submit form
            await trigger({
                method: 'POST',
                body: formData,
            });

            alert("Message sent successfully!");
            
            // Reset form
            setFormData({
                reason: "",
                name: "",
                email: "",
                company: "",
                phone: "",
                message: "",
                heardAbout: "",
                locationId: "",
                agree: false,
            });
        } catch (err) {
            if (err instanceof Yup.ValidationError) {                const errors: Record<string, string> = {};
                err.inner.forEach((error) => {
                    if (error.path) {
                        errors[error.path] = error.message;
                    }
                });
                setValidationErrors(errors);
            } else {
                console.log(err)
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
                >
                    <NativeSelectOption value="">How can we help?</NativeSelectOption>
                    {helpReasons.map((reason) => (
                        <NativeSelectOption key={reason} value={reason}>
                            {reason}
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
                    />
                    {validationErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                    )}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <Input 
                        name="company" 
                        value={formData.company} 
                        onChange={handleChange} 
                        placeholder="Company" 
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
                    />
                    {validationErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                    )}
                </div>
            </div>

            <div>
                <Textarea
                    name="message"
                    placeholder="Message"
                    className="min-h-[200px] rounded-xl !w-full border-nexia-dark-teal-100 shadow-none bg-gray-100 placeholder:text-nexia-gray placeholder:font-medium placeholder:text-lg"
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                />
                {validationErrors.message && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
                )}
            </div>

            <div>
                <NativeSelect name="heardAbout" onChange={handleChange} value={formData.heardAbout}>
                    <NativeSelectOption value="">Where did you hear about us?</NativeSelectOption>
                    {heardAbout.map((item) => (
                        <NativeSelectOption key={item} value={item}>
                            {item}
                        </NativeSelectOption>
                    ))}
                </NativeSelect>
                {validationErrors.heardAbout && (
                    <p className="text-red-500 text-sm mt-1">{validationErrors.heardAbout}</p>
                )}
            </div>

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
                                className="accent-nexia-light-teal-100 !rounded-full w-4 h-4 mr-3"
                            />
                            I agree to the{" "}
                            <Link href="/privacy-policy" className="mx-1 underline font-bold text-nexia-dark-teal-100">
                                privacy policy
                            </Link>
                        </label>
                        {validationErrors.agree && (
                            <p className="text-red-500 text-sm mt-1">{validationErrors.agree}</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    disabled={isMutating}
                    type="submit"
                    className="rounded-full border border-nexia-dark-teal-100 bg-gray-100 px-8 py-2 font-bold text-nexia-dark-teal-100 hover:bg-nexia-light-teal-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {isMutating ? "Submitting..." : "Submit"}
                </button>
            </div>

        </form>
    );
};

export default ContactForm;