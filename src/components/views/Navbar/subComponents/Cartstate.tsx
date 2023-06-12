"use client"
import { cartContext } from "@/global/context"
import { useContext, useEffect, useState } from "react"
import { BsCart2 } from "react-icons/bs"

const Cartstate = () => {
    let { cartArray,quantity } = useContext(cartContext);

    return (
        <div className="flex-shrink-0 relative w-11 h-11 bg-gray-300 rounded-full flex items-center justify-center">
            <div
                className="w-4 h-4 absolute top-1 right-2 bg-red-400 text-xs font-light rounded-full flex justify-center items-center"
            >
                {quantity}
            </div>
            <BsCart2 size={24} />
        </div>
    )

}

export default Cartstate