import { AiOutlineClose } from "react-icons/ai"
import Image from "next/image"
import { cartContext } from "@/global/context"
import { useContext, useState } from "react"
import Link from "next/link"


const SubComp = () => {
    let { userData , LogOut } = useContext(cartContext)
    const [isSideProfileOpen, setSideProfileOpen] = useState(false);

    return (
        <div className="overflow-hidden">
            {userData ?
                <div onClick={() => setSideProfileOpen(true)} className="w-8 h-8 rounded-full flex items-center justify-center text-gray-700 bg-white">
                    {userData.photoUrl ?
                        <Image className="object-cover" width={300} height={300} src={userData.photoUrl} alt={userData.displayName} />
                        : userData.displayName ?
                            <p className="text-sm">{userData.displayName.slice(0, 1)}</p>
                            :
                            <p className="text-sm ">N</p>
                    }
                </div>
                :
                <div className="flex gap-2">
                    <Link href="/signup" className="text-white bg-gray-900 px-3 py-1">SignUp</Link>
                    <Link href="/signin" className="text-white border border-purple-800 px-3 py-1">SignIn</Link>
                </div>
            }

            <div className={`${isSideProfileOpen ? "visible translate-x-0" : "invisible translate-x-full"} duration-500 py-4 px-4 w-80 bg-gray-800 h-full text-gray-100 absolute right-0 top-0 bottom-0 z-50`}>
                <div className="flex justify-between py-2 items-center">
                    <h6 className="font-semibold text-xl">Profile</h6>
                    <div onClick={() => setSideProfileOpen(false)}>
                        <AiOutlineClose size={26} />
                    </div>
                </div>
                <button className="w-full border rounded-lg p-2" onClick={LogOut}>
                    Log Out
                </button>
            </div>
        </div>
    )
}

export default SubComp