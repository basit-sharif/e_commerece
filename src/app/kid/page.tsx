import { oneProductType, responseType } from "@/components/utils/ProductsDataArrayAndType";
import Card from "@/components/views/Card";
import { FC } from "react"

async function fetchAllProductsData() {
  let res = await fetch(`https://${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}.api.sanity.io/v2023-05-26/data/query/production?query=*%5B_type%20%3D%3D%20%22products%22%20%26%26%20productTypes%5B0%5D%3D%3D%20%22Kid%22%5D`, {
    next: {
      revalidate: 60
    }
  });

  if (!res.ok) {
    throw new Error("Failed to fetch")
  }

  return res.json();
}


const Female = async ({ params }: { params: { ftype: string } }) => {
  let res: responseType = await fetchAllProductsData();
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 py-10 lg:grid-cols-3 gap-4"
    >
      {res.result.map((items: oneProductType, index: number) => (
        <Card key={index} singleProductData={items} />
      ))}
    </div>
  )
}

export default Female