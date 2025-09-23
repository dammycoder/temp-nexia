
import { Bounded } from "@/components/bouned";
import Image from "next/image";
import { strapiFetch } from "@/lib/strapi";
import { LinkedInIcon, InstagramIcon, TwitterIcon } from "@/components/atoms/icons";

const Page = async({params}:Readonly<{ params: Promise<{slug:string}>}>) =>{
const {slug} = await params;

const insight = await strapiFetch<{
  data: Array<{
    id: number;
      title: string;
      slug: string;
      description: string;
      category: string;
      contents: string;
      datePublished: string;
      image: { data: { attributes: { url: string } } };
  }>;
}>("/api/insights", {
  query: {
    filters: {
      slug: {
        $eq: slug 
      },
    },
    populate: { image: true },
  },
});


const insightData = insight.data[0];
console.log("na the data be this", insightData)

  return (
    <div className="">
      <div className="bg-nexia-dark-teal-100 items-center py-5">
        <Bounded className="flex flex-col gap-5 lg:flex-row">
          <div className="w-full lg:w-1/2">
            <p className="text-nexia-light-teal-100 text-xl lg:text-2xl">
              {insightData?.category}
            </p>
            <p className="text-2xl font-light text-white md:text-3xl lg:text-5xl">
             {insightData?.title}
            </p>
          </div>

          <div className="h-[300px] w-full overflow-clip lg:w-1/2">
            <Image
              src="/assets/jpg/events.jpg"
              alt=""
              width={200}
              height={200}
              className="rounded-tr-4xl rounded-bl-4xl max-h-[500px] w-full object-cover"
            />
          </div>
        </Bounded>
      </div>

      <Bounded className="flex justify-between gap-10 py-8  flex-col lg:flex-row">
        <div className="w-full lg:w-3/5">
          <div dangerouslySetInnerHTML={{ __html: insightData?.contents || "" }} />
        </div>
        <div className="w-full flex flex-col gap-3 lg:w-2/5">
     <div>
         <p className="text-xl text-nexia-dark-teal-100">Share:</p>
        <div className="flex items-center gap-3">
          <LinkedInIcon className="text-nexia-dark-teal-100 hover:text-nexia-light-teal-100 transition-colors"/>
          <TwitterIcon className="text-nexia-dark-teal-100 hover:text-nexia-light-teal-100 transition-colors"/>
          <InstagramIcon className="text-nexia-dark-teal-100 hover:text-nexia-light-teal-100 transition-colors"/>
        </div>

        
     </div>

          <div className="mt-3">
         <p className="text-2xl text-nexia-light-teal-100">Related Services:</p>
        <div>
          {/* social media Icons */}
          <p className="text-neixa-dark-teal-100 text-lg">Advisory</p>
        </div>

        
     </div>

          <div >
         <p className="text-2xl text-nexia-light-teal-100">Related Insights:</p>
        <div>
          {/* social media Icons */}
        </div>

        
     </div>
        </div>
      </Bounded>
    </div>
  );
}

export default Page;
