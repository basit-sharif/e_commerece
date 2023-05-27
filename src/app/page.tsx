import BASE_PATH_FORAPI from "@/components/shared/BasePath";
import Hero from "@/components/views/Hero";
import ProductCarousel from "@/components/views/ProductCarousel";
import ProductsType from "@/components/views/ProductTypes";

async function fetchAllProductsData() {
  let res = await fetch(`${BASE_PATH_FORAPI}/api/products`);

  if (!res.ok) {
    throw new Error("Failed to fetch")
  }

  return res.json();
}

export default async function Home() {
  let { response } = await fetchAllProductsData();

  return (
    <div>
      <Hero />
      <ProductsType />
      <ProductCarousel ProductData={response} />
    </div>
  )
}
