"use client";

import React, { useState } from "react";
import { Input } from "@/_components/a-input";
import { Textarea } from "@/_components/atoms/a-textarea";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import useSWRMutation from "swr/mutation";
import Link from "next/link";


const helpReasons = [
    "General Inquiry",
    "Request For Brochure",
    "Request For Quote",
    "Media Inquiry",
    "Complaint"
]

const heardAbout = [
    "Web Search",
    "Social Media",
    "Traditional Media",
    "Referral/ Word of Mouth",
    "Ai Database",
    "Other"
]

const fetcher = async (url: string, { arg }: { arg: any }) => {
    const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(arg),
    });
    if (!res.ok) throw new Error("Form submission failed");
    return res.json();
};

const ContactForm: React.FC<> = () => {
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

    const { trigger, isMutating, error } = useSWRMutation("/api/contact", fetcher);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await trigger(formData);
            alert("Message sent successfully!");
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
            console.error(err);
            alert("Failed to send message.");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-6 lg:w-1/2">
            <NativeSelect name="reason" onChange={handleChange} value={formData.reason} className="!w-full">
                <NativeSelectOption value="">How can we help?</NativeSelectOption>
                {helpReasons.map((reason) => (
                    <NativeSelectOption key={reason} value={reason}>
                        {reason}
                    </NativeSelectOption>
                ))}
            </NativeSelect>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
                <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" type="email" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Input name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
                <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" />
            </div>


            <Textarea
                name="message"
                placeholder="Message"
                className="min-h-[200px] rounded-xl !w-full border-nexia-dark-teal-100 shadow-none bg-gray-100 placeholder:text-nexia-gray placeholder:font-medium placeholder:text-lg "
                rows={6}
                value={formData.message}
                onChange={handleChange}
            />

            <NativeSelect name="heardAbout" onChange={handleChange} value={formData.heardAbout}>
                <NativeSelectOption value="">Where did you hear about us?</NativeSelectOption>
                {heardAbout.map((item) => (
                    <NativeSelectOption key={item} value={item}>
                        {item}
                    </NativeSelectOption>
                ))}
            </NativeSelect>


            <div className="space-y-3">
                <p className="text-sm font-bold text-nexia-gray">
                    By submitting this form, you consent to how Nexia will process your
                    personal data.
                </p>

                <div className="flex flex-col space-y-2">
                    <p className="text-sm font-bold text-nexia-gray">
                        Do you agree to Nexia Agbo & Co processing your personal data?
                    </p>
                    <label className="flex items-center text-sm text-nexia-gray">
                        <label className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                name="agree"
                                checked={formData.agree}
                                onChange={handleChange}
                                className="accent-nexia-light-teal-100 !rounded-full w-4 h-4 mr-3 "
                            />

                        </label>
                        I agree to the{" "}
                        <Link href="/privacy-policy" className="mx-1 underline font-bold text-nexia-dark-teal-100">
                            privacy policy
                        </Link>
                    </label>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    disabled={isMutating}

                    type="submit"
                    className="rounded-full border border-nexia-dark-teal-100 bg-gray-100 px-8 py-2 font-bold text-nexia-dark-teal-100 hover:bg-nexia-light-teal-50 transition"
                >
                    {isMutating ? "Submitting..." : "Submit"}
                </button>
            </div>



            {error && <p className="text-red-500 mt-2">{error.message}</p>}
        </form>
    );
};

export default ContactForm;
