import { strapiFetch } from "@/lib/strapi";
import { Header } from "./index";
import { HeaderData } from "@/types/menu";

async function loadHeaderData() {
  const globalData = await strapiFetch<{
    data: {
      header: HeaderData;
    };
  }>("/api/global", {
    query: {
      populate: {
        header: {
          populate: {
            logoLink: {
              populate: ["image"]
            },
            link: {
              populate: ["subLink"]
            },
            cta: true
          }
        }
      },
    },
  });
  
  return globalData.data.header;
}

export default async function HeaderWrapper() {
  const data = await loadHeaderData();
  return <Header data={data} />;
}
