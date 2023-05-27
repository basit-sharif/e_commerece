import { createClient } from "next-sanity";
import { NextResponse } from "next/server";
import { SanityClient } from "sanity";

let client: SanityClient = createClient({
    projectId: `${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`,
    dataset: `${process.env.NEXT_PUBLIC_SANITY_DATASET}`,
    apiVersion: "2022-03-25",
    useCdn: false
});

export async function GET() {

    try {
        let response = await client.fetch(`*[_type == "products"]`);
        console.log(response);
        return NextResponse.json({ response })

    } catch (error) {

        console.log((error as { message: string }).message);
        return NextResponse.json({ "Error": error })

    }


};