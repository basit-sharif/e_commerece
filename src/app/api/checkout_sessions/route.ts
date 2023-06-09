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
        price: 'price_1NH3l5SGP918EeainhlVNKsL',
        name: 'Pink Fleece Sweatpants',
        quantity: 1,
    },
    {
        price: 'price_1NHCSoSGP918EeaitdaGJFnM',
        name: 'Brushed Raglan Sweatshirt',
        quantity: 1,
    },
    {
        price: 'price_1NHCVSSGP918EeaiKOHQlFJk',
        name: 'Cameryn Sash Tie Dress',
        quantity: 1,
    },
    {
        price: 'price_1NHCXISGP918Eeair5JmVaCK',
        name: 'Imperial Alpaca Hoodie',
        quantity: 1,
    },
    {
        price: 'price_1NHCYVSGP918EeailpafOJg7',
        name: 'Kids One',
        quantity: 1,
    },
    {
        price: 'price_1NHCboSGP918Eeai9Ok4CYaS',
        name: 'Imperial Alpaca Hoodie Woman',
        quantity: 1,
    },
    {
        price: 'price_1NHCcxSGP918EeaiIptQokgW',
        name: 'Flex Sweatpants',
        quantity: 1,
    },
    {
        price: 'price_1NHCdpSGP918EeairCbrSid6',
        name: 'Lite Sweatpants',
        quantity: 1,
    },
    {
        price: 'price_1NHCfDSGP918EeaiVS5kQfOu',
        name: 'Raglan Sweatshirt',
        quantity: 1,
    },
    {
        price: 'price_1NHCnESGP918EeaibM0RgW0f',
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
        let line_itemToSend = line_item.map((item: typeOfData) => {
            return {
                price: item.price,
                quantity: item.quantity
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