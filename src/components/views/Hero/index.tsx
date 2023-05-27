import { heroGirlimg } from "@/components/assets"
import { BsCart2 } from "react-icons/bs"
import Image from "next/image"

const Hero = () => {
    const btnText = "Start\n shopping";

    return (
        <div className="py-5 flex justify-between items-center px-2">
            {/* right side */}
            <div className="space-y-6 max-w-sm">
                <button
                    aria-label="redirect the user to sale page"
                    className="rounded-md bg-primaryWhite text-blue-700 font-medium px-4 py-2"
                >
                    Sale 70%
                </button>
                <h1 className="text-4xl md:text-6xl text-gray-800 font-bold">An Industrial Take on Streetwear</h1>
                <p className="text-gray-700">Anyone can beat you but no one can beat your outfit as long as you wear Dine outfits.</p>
                <button
                    aria-label="redirect the user to sale page"
                    className="flex gap-3 items-center rounded-sm text-lg ring-1 ring-slate-800 bg-gray-800 text-white font-semibold py-3 px-5"
                >
                    <BsCart2 />
                    <p className="whitespace-pre leading-4">
                        {btnText}
                    </p>
                </button>
                <div className="flex gap-4">
                    <div className="w-14 md:w-28">
                        <Image width={100} height={100} src={"https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFeatured1.66abddd4.png&w=128&q=75"} alt="bazaar" />
                    </div>
                    <div className="w-14 md:w-28">
                        <Image width={100} height={100} src={"https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFeatured2.247cd605.png&w=128&q=75"} alt="baztel" />
                    </div>
                    <div className="w-14 md:w-28">
                        <Image width={100} height={100} src={"https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFeatured3.6076521d.png&w=128&q=75"} alt="versase" />
                    </div>
                    <div className="w-14 md:w-28">
                        <Image width={100} height={100} src={"https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2FFeatured4.0489f1fc.png&w=128&q=75"} alt="in style" />
                    </div>
                </div>
            </div>

            {/* left side */}
            <div className="hidden md:flex bg-primaryWhite rounded-full">
                <Image src={heroGirlimg} alt="heroimg" />
            </div>
        </div>
    )
}

export default Hero