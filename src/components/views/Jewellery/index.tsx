import Image from "next/image"

const Jewellery = () => {
    return (
        <div className="px-1 text-gray-700">

            {/* top */}
            <div className="flex justify-start md:justify-end text-4xl md:text-5xl font-bold py-4 ">
                <h6 className="max-w-[27rem]">Unique and Authentic Vintage Designer Jewellery</h6>
            </div>

            {/* bottom */}
            <div className="flex flex-col md:flex-row justify-between py-4 mt-2 gap-5">
                {/* left */}

                <div className="relative basis-1/2  gap-6 lg:gap-10 grid grid-cols-2 grid-rows-2">
                    <div className="absolute -z-50 text-slate-200 inset-0">
                        <h6 className="text-5xl md:text-7xl lg:text-[7.3rem] leading-[5.9rem] font-bold">Different from others</h6>
                    </div>
                    <div className="max-w-[13rem] space-y-2">
                        <h6 className="font-semibold text-xl">Using Good Quality Materials</h6>
                        <p className="text-lg leading-5">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                    </div>
                    <div className="max-w-[13rem] space-y-2">
                        <h6 className="font-semibold text-xl">Using Good Quality Materials</h6>
                        <p className="text-lg leading-5">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                    </div>
                    <div className="max-w-[13rem] space-y-2">
                        <h6 className="font-semibold text-xl">Using Good Quality Materials</h6>
                        <p className="text-lg leading-5">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                    </div>
                    <div className="max-w-[13rem] space-y-2">
                        <h6 className="font-semibold text-xl">Using Good Quality Materials</h6>
                        <p className="text-lg leading-5">Lorem ipsum dolor sit amt, consectetur adipiscing elit.</p>
                    </div>
                </div>




                {/* right */}
                <div className="flex flex-col lg:flex-row basis-1/2">
                    <div className="w-full px-4 lg:px-0 lg:w-80">
                        <Image width={1000} height={1000} src={"https://full-stack-ecommerce-clothing-web.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffeature.1118a2f3.png&w=384&q=75"} alt={"Designer Jewellery"} />
                    </div>
                    <div className="space-y-6 md:space-y-4 p-6">
                        <p style={{wordSpacing:"0.8rem"}} className="h-[90%] lg:max-w-[15rem]">
                            This piece is ethically crafted in our small family-owned workshop in Peru with unmatched attention to detail and care. The Natural color is the actual natural color of the fiber, undyed and 100% traceable.
                        </p>
                        <button className="text-white bg-gray-900 rounded-md py-2 px-6">See All Products</button>
                    </div>
                </div>



            </div>
        </div>
    )
}

export default Jewellery