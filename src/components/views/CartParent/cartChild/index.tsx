"use client"
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType"
import { cartContext } from "@/global/context"
import Image from "next/image"
import { FC, useContext, useEffect, useState } from "react"
import { RiDeleteBin6Line } from "react-icons/ri"
import AllProductsCompo from "../../AllProduct"
import { client } from "../../../../../sanity/lib/client"
import imageUrlBuilder from '@sanity/image-url'
import toast, { Toaster } from "react-hot-toast"
import { useRouter } from "next/navigation"



const builder: any = imageUrlBuilder(client);
function urlFor(source: any) {
    return builder.image(source)
}

const notificationError = (title: string) => {
    toast(title, {
        position: "top-right"
    })
};

const CartComp = ({ allProductsOfStore }: { allProductsOfStore: Array<oneProductType> }) => {
    const [allProductsForCart, setAllProductsForCart] = useState<any>();
    let { userData, cartArray, dispatch, loading } = useContext(cartContext)
    const [totalPrice, setTotalPrice] = useState(0);
    const [allowedToAdd, setAllowedToAdd] = useState(true);
    let router = useRouter();

    function PriceSubTotal(round: number) {
        for (let index = 0; index < cartArray.length; index++) {
            setAllowedToAdd(false);
            const element = cartArray[index];
            let subTotalPrice = element.quantity * element.price;
            if (subTotalPrice) {
                if (round === 1) {
                    setTotalPrice(totalPrice + subTotalPrice);
                } else if (round === 2) {
                    setTotalPrice((prev:any)=>subTotalPrice);
                    router.refresh();
                    // console.log(cartArray,totalPrice)
                }
            }
        }
    }




    if (cartArray.length !== 0) {
        if (allowedToAdd) {
            PriceSubTotal(1);
        }
    }

    function handleRemove(product_id: string) {
        if (userData) {
            let user_id = userData.uuid;
            dispatch("removeFromCart", { product_id, user_id });
        }
    }
    useEffect(() => {
        if (cartArray.length !== 0) {
            let data = allProductsOfStore.filter((item: oneProductType) => {
                for (let index = 0; index < cartArray.length; index++) {
                    let element: any = cartArray[index];
                    if (element.product_id === item._id) {
                        return true
                    };
                };
            });
            setAllProductsForCart(data);

        }

    }, [cartArray]);

    async function handleDecrementByOne(product_id: string, price: any) {
        let stableQuantity: number = 0;
        cartArray.forEach((element: any) => {
            if (element.product_id == product_id) {
                stableQuantity = element.quantity
            }
        });
        
        if (stableQuantity - 1 <= 1) {
            notificationError("Did not accept lower than 1")
        } else {
            await dispatch("updateCart", {
                product_id: product_id,
                quantity: stableQuantity - 1,
                user_id: userData.uuid,
                price: price,
            });
            notificationError("Decremented by One")
        }
        PriceSubTotal(2);
    }
    async function handleIncrementByOne(product_id: string, price: any) {
        let stableQuantity: number = 0;
        cartArray.forEach((element: any) => {
            if (element.product_id == product_id) {
                stableQuantity = element.quantity
            }
        });
        let returnedVal = await dispatch("updateCart", {
            product_id: product_id,
            quantity: stableQuantity + 1,
            user_id: userData.uuid,
            price: price,
        })
        notificationError("Incremented by One");
        console.log(returnedVal)
        if (returnedVal === "sucess") {
            PriceSubTotal(2);
        }
    }
    return (
        <div className="py-10 px-4 md:px-10">
            <Toaster />

            {/* first */}
            <div className="py-6">
                <h1 className="text-2xl font-semibold text-gray-900">Shopping Cart</h1>
            </div>


            {/* second */}
            <div className="flex flex-col lg:flex-row gap-6">


                <div className="flex flex-col basis-[69%] gap-4">

                    {allProductsForCart && allProductsForCart.map((item: oneProductType, index: number) => (
                        <div key={index} className=" flex flex-shrink-0 gap-6">
                            <div className="w-[14rem]">
                                <Image className="rounded-xl" width={1000} height={1000} src={urlFor(item.image[0]).width(1000).height(1000).url()} alt={item.image[0].alt} />
                            </div>
                            <div className="space-y-1 md:space-y-3 w-full">
                                <div className="flex justify-between">
                                    <h2 className="md:text-2xl font-light text-gray-700">{item.productName}</h2>
                                    <div onClick={() => handleRemove(item._id)}>
                                        <RiDeleteBin6Line size={28} />
                                    </div>
                                </div>
                                <p className="text-gray-400 font-medium">{item.productTypes[1] ? item.productTypes[1] : "All"}</p>
                                <h3 className="text-sm md:text-base">Delivery Estimation</h3>
                                <h4 className="text-orange-400 font-semibold md:text-xl">5 Working Days</h4>
                                <div className="flex justify-between">
                                    <p className="font-semibold md:text-lg">{"$"}{item.price}</p>
                                    <div className={`flex gap-2 ${loading ? "opacity-25" : "opacity-100"} items-center text-lg`}>
                                        <button
                                            onClick={() => handleDecrementByOne(item._id, item.price)}
                                            className="select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full bg-gray-200">
                                            -
                                        </button>
                                        <p>
                                            {
                                                cartArray.map((subItem: any) => {
                                                    let matching = subItem.product_id === item._id;
                                                    let quantity = subItem.quantity;

                                                    if (matching) {
                                                        return quantity;
                                                    } else {
                                                        return ""
                                                    }
                                                })
                                            }
                                        </p>
                                        <button
                                            onClick={() => handleIncrementByOne(item._id, item.price)}
                                            disabled={loading}
                                            className="border select-none cursor-pointer flex justify-center items-center w-8 h-8 rounded-full  border-gray-800"
                                        >
                                            +
                                        </button>
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
                        <p>{cartArray.length} Products</p>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-lg font-light">Subtotal:</p>
                        <p>${totalPrice}</p>
                    </div>
                    <button className="text-white bg-gray-900 border border-gray-500 px-4 py-2 w-full">Process to Checkout</button>
                </div>

            </div>


        </div>
    )
}

export default CartComp
