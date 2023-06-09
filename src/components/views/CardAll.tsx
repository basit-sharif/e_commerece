import Image from 'next/image'
import imageUrlBuilder from '@sanity/image-url'
import React, { FC } from 'react'
import { oneProductType } from '../utils/ProductsDataArrayAndType'
import { client } from '../../../sanity/lib/client';
import Link from 'next/link';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
    return builder.image(source)
}


const CardAll: FC<{ singleProductData: oneProductType }> = ({ singleProductData }) => {
    return (
        <div className='mx-auto w-[11rem] md:w-[16rem] space-y-3 duration-300'>
            <div className='relative w-full'>
                <div className='absolute inset-0 z-10' />
                <Image width={1000} height={1000} src={urlFor(singleProductData.image[0]).width(1000).height(1000).url()} alt={singleProductData.image[0].alt} />
            </div>
            <div className='space-y-1 text-gray-600 font-semibold text-lg select-none'>
                <Link href={`/catalog/${singleProductData.slug.current}`}>
                    <h6>{singleProductData.productName}</h6>
                    <p className='text-sm text-pink-500'>{singleProductData.productTypes[0]}</p>
                    <p>${singleProductData.price}</p>
                </Link>
            </div>
        </div>
    )
}

export default CardAll