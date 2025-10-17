import React from 'react'
import type { Metadata } from 'next';
import Image from 'next/image';
import { Bounded } from '@/_components/bouned';

export const metadata: Metadata = {
    title:
      "Privacy Policy | Nexia Agbo Abel & Co - Global Network of Accounting & Consultant Firms",
  };

const page = () => {
  return (
    <section id="privacy-policy-page">
          <div className="relative flex h-[20vh] ">
        {/* Background Image */}
        <Image
            src="/assets/jpg/hero-image.jpg"

          alt="Insights Background"
          fill
          className="object-cover"
          priority
        />

        {/* Example content */}
        <Bounded className="relative z-10 container flex items-center  text-white">
        <h1 className="text-4xl ">Privacy Policy</h1>
           
        </Bounded>
      </div>

      <Bounded className="py-8 flex flex-col gap-4">
        <div>
        <h1 className='font-medium text-nexia-dark-teal-100 text-3xl'>1. Who We are</h1>
        <p className='px-6 text-nexia-gray text-lg'>
        Our website address is: https://nexia.ng.
        </p>
        </div>

        <div>
        <h1 className='font-medium text-nexia-dark-teal-100 text-3xl'>2. What personal data we collect and why we collect it</h1>
<p className='px-6 text-nexia-gray text-lg'>
<span className='text-nexia-dark-teal-100 font-bold'>Comments:</span> When visitors leave comments on the site we collect the data shown in the comments form, and also the visitor’s IP address and browser user agent string to help spam detection.

An anonymized string created from your email address (also called a hash) may be provided to the Gravatar service to see if you are using it. The Gravatar service privacy policy is available here: https://automattic.com/privacy/. After approval of your comment, your profile picture is visible to the public in the context of your comment.



</p>

<p className='px-6 text-nexia-gray text-lg'>
<span className='text-nexia-dark-teal-100 font-bold'>Media:</span> 
If you upload images to the website, you should avoid uploading images with embedded location data (EXIF GPS) included. Visitors to the website can download and extract any location data from images on the website.



</p>

        </div>
      </Bounded>
    </section>
  )
}

export default page