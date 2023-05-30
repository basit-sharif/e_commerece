"use client"
import Image from "next/image"
import { imagesType, oneProductType } from "@/components/utils/ProductsDataArrayAndType"
import { FC, useState } from "react"
import { client } from "../../../../sanity/lib/client";
import imageUrlBuilder from '@sanity/image-url'
import { BsCart2 } from "react-icons/bs";


const builder: any = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source)
}


const ProductDetail: FC<{ item: oneProductType }> = ({ item }) => {
  const [imageForPreviewOfSelected, setImageForPreviewOfSelected] = useState<string>(item.image[0]._key);
  const [quantity, setQuantity] = useState(1);

  function incrementTheQuantity() {
    setQuantity(quantity + 1);
  };

  function decrementTheQuantity() {
    if (quantity !== 0) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row justify-center items-center">

      {/* left */}
      <div className="flex gap-x-4 md:gap-x-8">

        {/* left */}
        <div className="space-y-4">
          {
            item.image.map((subItem: imagesType, index: number) => (
              <div key={index} className="w-16 md:w-24" onClick={() => setImageForPreviewOfSelected(subItem._key)}>
                <Image width={1000} height={1000} alt={subItem.alt} src={urlFor(subItem).width(1000).height(1000).url()} />
              </div>
            ))
          }
        </div>

        {/* right */}
        <div className="w-[33rem] flex flex-wrap-0">
          {item.image.map((subItem: imagesType, index: number) => {
            if (subItem._key === imageForPreviewOfSelected) {
              return (
                <Image width={1000} height={1000} alt={subItem.alt} src={urlFor(subItem).width(1000).height(1000).url()} />
              )
            }
          })}
        </div>

      </div>




      {/* right */}
      <div className="p-6 space-y-8">
        <div>
          <h1 className="text-3xl text-gray-700">{item.productName}</h1>
          <p className="text-pink-600 text-xl font-medium">{item.productTypes[1]}</p>
        </div>
        <div className="space-y-2">
          <p className="text-lg font-semibold text-gray-700">Select Size</p>
          <div className="flex gap-2 text-pink-600">
            {
              item.size.map((subItem: string, index: number) => (
                <div className="hover:shadow-xl font-semibold cursor-pointer rounded-full bg-gray-100 w-12 h-12 flex justify-center items-center">{subItem}</div>
              ))
            }
          </div>
        </div>
        <div className="flex space-x-7">
          <p className="font-semibold text-xl text-gray-800">Quantity:</p>
          <div className="flex gap-2 items-center text-lg">
            <div
              onClick={decrementTheQuantity}
              className="select-none cursor-pointer flex justify-center items-center w-9 h-9 rounded-full bg-gray-200">-</div>
            <p>{quantity}</p>
            <div
              onClick={incrementTheQuantity}
              className="select-none cursor-pointer flex justify-center items-center w-9 h-9 rounded-full border border-gray-800">+</div>
          </div>
        </div>
        <div className="flex gap-x-8 items-center">
          <button className="flex items-center text-white bg-gray-900 border border-gray-500 px-4 py-2">
            <BsCart2 />
            &nbsp;
            &nbsp;
            Add to Cart
          </button>
          <p className="text-2xl font-semibold">${item.price}{".00"}</p>
        </div>
      </div>


    </div>
  )
}

export default ProductDetail