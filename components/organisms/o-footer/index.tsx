import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Bounded } from "@/components/bouned";
import { LinkedInIcon, InstagramIcon, TwitterIcon } from "@/components/atoms/icons";

const Footer = () => {
  return (
    <>
      <footer className="bg-nexia-light-teal-80  py-8 font-effra">
        <Bounded className="flex justify-between gap-4  flex-col lg:flex-row">
          <div className="flex w-full flex-col gap-3 lg:w-1/2">
            {/* <Logo/> */}
            <div className="flex w-full items-center gap-2 text-white">
              <p className="text-lg lg:text-2xl">Member of</p>{" "}
              <Image
                src="/assets/png/nexia-logo-white-300x38.png"
                alt="nexia-global-logo"
                width={100}
                height={100}
                className="w-[200px] object-contain"
              />
            </div>
            <p className="text-base text-white">
              © Nexia Agbo Abel & Co. • All Right Reserved.Nexia Agbo Abel &
              Co. is a member firm of the “Nexia International” network. Nexia,
              a company registered in the Isle of Man, does not provide services
              to clients. Please see the “Member firm disclaimer” for further
              details.
            </p>
          </div>
          <div className="w-1/2">
            <ul className="text-left lg:text-right text-lg text-white xl:text-lg">
              <Link href="#" className="block">Site Map</Link>
              <Link href="#" className="block">Disclaimer</Link>
              <Link href ="#" className="block">Privacy Policy</Link>
              <Link href ="#" className="block">Cookie Policy</Link>
              <Link href ="#" className="block">Email Disclaimer</Link>
              <Link href="#" className="block">Accessibility</Link>
              <Link href="#" className="block">Events</Link>
              <Link href="#" className="block">Insights</Link>
            </ul>
          </div>
        </Bounded>
        <Bounded className="mt-3 flex gap-3 items-center lg:justify-end">
          <LinkedInIcon/> 
          <InstagramIcon/>
          <TwitterIcon/>
        </Bounded>
      </footer>
      <div className="bg-nexia-dark-teal-100  py-8 font-effra">
        <Bounded className="flex  text-white">
          <p>
            Nexia International Limited does not deliver services in its own
            name or otherwise. Nexia International Limited and the member firms
            of the Nexia International network (including those members which
            trade under a name which includes the word NEXIA) are not part of a
            worldwide partnership. Nexia International Limited does not accept
            any responsibility for the commission of any act, or omission to act
            by, or the liabilities of, any of its members. Each member firm
            within the Nexia International network is a separate legal entity.
          </p>
        </Bounded>
      </div>
    </>
  );
};

export default Footer;
