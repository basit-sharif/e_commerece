import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";
import { client } from "../../../../sanity/lib/client";
import Card from "@/components/views/Card";

async function getAllProductsForSearch() {
    let response = await client.fetch(`*[_type == "products"]`);
    return response;
};

const Search = async ({ params }: { params: { query: string } }) => {
    let slug = (params.query).toLowerCase();
    let data = await getAllProductsForSearch()
    let dataToMap = await data.filter((item: oneProductType) => {
        if ((item.productName).toLowerCase().indexOf(slug) >= 0) {
            return true
        }
        return false
    });
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 py-10 lg:grid-cols-3 gap-4"
        >
            {dataToMap && dataToMap.map((items: oneProductType, index: number) => (
                <Card key={index} singleProductData={items} />
            ))}
        </div>
    )
}

export default Search