import { HiOutlineChevronDown } from "react-icons/hi"
import { NavbarArray, NavbarItemType } from "@/components/utils/NavbarArrayAndTypes"
import Link from "next/link"

const MobileNavbar = () => {
    return (
        <div>
            <div className="w-full px-6 py-4 bg-gray-100">
                {
                    NavbarArray.map((item: NavbarItemType, index: number) => {
                        return (
                            <li key={index} className="py-2 px-3 hover:bg-purple-600 rounded-md duration-300 list-none flex justify-between">
                                <Link href={item.href}>{item.label}</Link>
                                {item.isDropDown ? <HiOutlineChevronDown className="mt-1 -rotate-180 group-hover:rotate-0 duration-300" size={15} /> : ""}
                            </li>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default MobileNavbar