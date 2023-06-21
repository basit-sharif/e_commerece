import Stripe from "stripe"
import { NextRequest, NextResponse } from "next/server";
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType";


interface typeOfData {
    price: string,
    name: string,
    quantity: number,
}

let orignalData: Array<typeOfData> = [
    {
        price: 'price_1NLM6oGWv7lYUltJ5GnDYwfO',
        name: 'Pink Fleece Sweatpants',
        quantity: 1,
    },
    {
        price: 'price_1NLM8bGWv7lYUltJS8C3UtWh',
        name: 'Brushed Raglan Sweatshirt',
        quantity: 1,
    },
    {
        price: 'price_1NLMBFGWv7lYUltJUgbOCM7F',
        name: 'Cameryn Sash Tie Dress',
        quantity: 1,
    },
    {
        price: 'price_1NLMK3GWv7lYUltJOAdEdaDA',
        name: 'Imperial Alpaca Hoodie',
        quantity: 1,
    },
    {
        price: 'price_1NLMM8GWv7lYUltJnKC8hHsJ',
        name: 'Kids One',
        quantity: 1,
    },
    {
        price: 'price_1NLMO2GWv7lYUltJSuKwqJ5r',
        name: 'Imperial Alpaca Hoodie Woman',
        quantity: 1,
    },
    {
        price: 'price_1NLMPgGWv7lYUltJ3B1ST39E',
        name: 'Flex Sweatpants',
        quantity: 1,
    },
    {
        price: 'price_1NLMR4GWv7lYUltJInH1xRm9',
        name: 'Lite Sweatpants',
        quantity: 1,
    },
    {
        price: 'price_1NLOOiGWv7lYUltJawy9Sxy7',
        name: 'Raglan Sweatshirt',
        quantity: 1,
    },
    {
        price: 'price_1NLOQ0GWv7lYUltJzyBK3ZyP',
        name: 'Flex Push Button Bomber',
        quantity: 1,
    },
]

// @ts-ignore
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req: NextRequest) {
    let cartItemsArray = await req.json();

    try {
        let line_item = orignalData.filter((item: typeOfData) => {
            for (let index = 0; index < cartItemsArray.length; index++) {
                const element: oneProductType = cartItemsArray[index];
                if (element.productName === item.name) {
                    return true
                }
            }
        })
        let line_itemToSend: any = line_item.map((item: typeOfData) => {
            for (let index = 0; index < cartItemsArray.length; index++) {
                const element: oneProductType = cartItemsArray[index];
                if (element.productName === item.name) {
                    return {
                        price: item.price,
                        quantity: element.quantity
                    }
                }
            }
        })

        let session = await stripe.checkout.sessions.create({
            line_items: line_itemToSend,
            mode: "payment",
            success_url: `${req.nextUrl.origin}/?success=true`,
            cancel_url: `${req.nextUrl.origin}/?success=false`
        })
        return NextResponse.json({ link: session.url });
    } catch (error) {
        console.log((error as { message: string }).message)
        return NextResponse.json({ error })
    }

}