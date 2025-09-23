import React from "react";
import type { Metadata } from "next";
import { Bounded } from "@/components/bouned";
import { Input } from "@/components/a-input";
import { Textarea } from "@/components/atoms/a-textarea";

export const metadata: Metadata = {
  title:
    "Contact Us | Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms",
};

const ContactPage = () => {
  return (
    <Bounded id="contact-us" className="flex flex-col gap-5 justify-between py-8 lg:flex-row">
      <div className="flex w-full  flex-col gap-5 lg:w-1/2">
        <p className="text-5xl font-[400] text-nexia-dark-teal-100">
          Get in touch
        </p>
        <div className="flex flex-col text-lg text-nexia-gray">
          <p className="font-bold">Lagos Office</p>
          <p>No 43 Anthony Enahoro Street, Utako, Abuja</p>
          <p>
            <span className="font-bold">Tel:</span> +234-809-2384-074
          </p>
        </div>

        <div className="flex flex-col text-lg text-nexia-gray">
          <p className="font-bold">Abuja Office</p>
          <p>No 43 Anthony Enahoro Street, Utako, Abuja</p>
          <p>
            <span className="font-bold">Tel:</span> +234-809-2384-074
          </p>
        </div>

        <div className="flex flex-col text-lg text-nexia-gray">
          <p className="font-bold">Kaduna Office</p>
          <p>No 43 Anthony Enahoro Street, Utako, Abuja</p>
          <p>
            <span className="font-bold">Tel:</span> +234-809-2384-074
          </p>
        </div>
      </div>
      {/* form */}
      <form className="flex w-full flex-col gap-5 lg:w-1/2">
        <Input type="text" placeholder="How can we help ?" />
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-3">
          <Input type="text" placeholder="Name" />
          <Input type="email" placeholder="Email" />
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-3">
          <Input type="text" placeholder="Company" />
          <Input type="email" placeholder="Phone " />
        </div>
    <div>
    <Textarea
          placeholder="Message"
          className="min-h-[200px] w-full text-base rounded-xl bg-gray-100 placeholder:font-effra placeholder:text-lg placeholder:font-medium focus:border-nexia-light-teal-100"
          rows={10}
        />
        <p className="text-sm text-nexia-gray mt-1 font-bold"> 600 max characters</p>
    </div>
    <Input type="text" placeholder="Where did you hear about us?" />

    <p className="text-sm text-nexia-gray font-bold">By submitting this contact form you will be providing some personal data and as such you will need to consent to the way that Nexia will process your personal data.
    </p>

    <p className="text-sm text-nexia-gray font-bold">Do you agree to Nexia Agbo & co processing your personal data?</p>

<p className="flex  items-center">
<input
  type="radio"
  className=" accent-nexia-light-teal-100 mr-2"
/> I agree to the  <span className="text-nexia-dark-teal-100 font-bold underline mx-1"> privacy policy</span>
</p>



<div className="flex justify-end">
<button type="submit" className="border border-nexia-dark-teal-100 text-nexia-dark-teal-100 w-fit px-6 py-2 rounded-full bg-gray-100 font-bold flex justify-self-end ">Submit</button>

</div>
      </form>
    </Bounded>
  );
};

export default ContactPage;
