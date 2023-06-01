"use client"
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType"
import { cartContext } from "@/global/context"
import Image from "next/image"
import { FC, useContext, useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import AllProductsCompo from "../../AllProduct"


const CartComp = async ({ allProductsOfStore }: { allProductsOfStore: Array<oneProductType> }) => {
    let { state } = useContext(cartContext);                    //cart items from context mean ids
    const [refresh, setRefresh] = useState(false);
    const [allProductsForCart, setAllProductsForCart] = useState<Array<oneProductType> | []>([]);           //

    setTimeout(() => {
        setRefresh(true);
    }, 5000);

    state?.cart.forEach((element: { productId: string, quantity: number }) => {

        for (let index = 0; index < allProductsOfStore.length; index++) {
            const item: oneProductType = allProductsOfStore[index];
            if (item._id === element.productId) {
                setAllProductsForCart([...allProductsForCart, item])
            }
        }

    })
    return (
        <div className="py-10 px-4 md:px-10">

            {/* first */}
            <div className="py-6">
                <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
            </div>


            {/* second */}
            <div className="flex flex-col lg:flex-row gap-6">


                <div className="flex flex-col basis-[69%] gap-2">

                    {allProductsForCart.map((item: oneProductType, index: number) => (
                        <div key={index} className=" flex flex-shrink-0 gap-6">
                            <div className="w-[14rem]">
                                <Image className="rounded-xl" width={1000} height={1000} src="https://cdn.sanity.io/images/dow10h3v/production/a6a38f6a1f31dafe5f3294a4384f865b7d25a344-370x394.png" alt="Nothing" />
                            </div>
                            <div className="space-y-1 md:space-y-3 w-full">
                                <div className="flex justify-between">
                                    <h2 className="md:text-2xl font-light text-gray-700">{item.productName}</h2>
                                    <RiDeleteBin6Line size={28} />
                                </div>
                                <p className="text-gray-400 font-medium">{item.productTypes[1] ? item.productTypes[1] : "All"}</p>
                                <h3 className="text-sm md:text-base">Delivery Estimation</h3>
                                <h4 className="text-orange-400 font-semibold md:text-xl">5 Working Days</h4>
                                <div className="flex justify-between">
                                    <p className="font-semibold md:text-lg">{item.price}</p>
                                    <div className="flex gap-2 items-center text-lg">
                                        <div
                                            className="select-none cursor-pointer flex justify-center items-center w-7 h-7 rounded-full bg-gray-200">-</div>
                                        <p>5</p>
                                        <div
                                            className="select-none cursor-pointer flex justify-center items-center w-7 h-7 rounded-full  border-gray-800">+</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>



                <div className="basis-1/4 space-y-6 px-6">
                    <h6 className="font-semibold text-xl">Order Summary</h6>
                    <div className="flex justify-between">
                        <p className="text-lg font-light">Quantity:</p>
                        <p>3 Products</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-lg font-light">Subtotal:</p>
                        <p>$550</p>
                    </div>
                    <button className="text-white bg-gray-900 border border-gray-500 px-4 py-2 w-full">Process to Checkout</button>
                </div>

            </div>


        </div>
    )
}

export default CartComp