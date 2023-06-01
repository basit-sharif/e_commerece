import CartComp from "@/components/views/CartParent/cartChild"
import ContextWrapper from "@/global/context"

async function fatchAllStoreProducts() {
  let res = await fetch(`https://peu0aj6l.api.sanity.io/v2023-05-26/data/query/production?query=*[_type == 'products']`, {
    cache: "no-store",
  })
  return res.json();
};

const Cart = async () => {
  let allProductsOfStore = await fatchAllStoreProducts();             //all products of sanity
  return (
    <ContextWrapper>
      {/* @ts-ignore */}
      <CartComp allProductsOfStore={allProductsOfStore.result} />
    </ContextWrapper>
  )
}

export default Cart