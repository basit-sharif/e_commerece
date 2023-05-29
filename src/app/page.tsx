import BASE_PATH_FORAPI from "@/components/shared/BasePath";
import { oneProductType, responseType } from "@/components/utils/ProductsDataArrayAndType";
import Hero from "@/components/views/Hero";
import ProductCarousel from "@/components/views/ProductCarousel";
import ProductsType from "@/components/views/ProductTypes";
import { useEffect } from "react";

async function fetchAllProductsData() {
  let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/query/production?query=*[_type == "products"]`);

  if (!res.ok) {
    throw new Error("Failed to fetch")
  }

  return res.json();
}

export default async function Home() {
  let { result }: responseType = await fetchAllProductsData();
  return (
    <div>
      {/* <Hero />
      <ProductsType /> */}
      <ProductCarousel ProductData={result} />
    </div>
  )
}
