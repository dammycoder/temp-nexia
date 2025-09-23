import { getStrapiUrl } from "@/lib/utils";
import qs from "qs";
import { Header } from "./index";

async function loadHeaderData() {
  try {
    const { fetchData } = await import('@/lib/fetch');
    const path = "/api/global";
    const baseUrl = getStrapiUrl();

    const query = qs.stringify({});
    const url = new URL(`${baseUrl}${path}`);
    url.search = new URLSearchParams(query).toString();

    const data = await fetchData(url.href);
    return data;
  } catch (error) {
    console.error('Failed to load header data:', error);
    return null;
  }
}

export default async function HeaderWrapper() {
  const data = await loadHeaderData();
  return <Header data={data} />;
}
