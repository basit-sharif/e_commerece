import { FC } from "react"
import { HiOutlineChevronDown } from "react-icons/hi"
import { NavbarArray, NavbarItemType } from "@/components/utils/NavbarArrayAndTypes"
import Link from "next/link"
import { useState } from "react"

const Expand: FC<{ item: NavbarItemType }> = ({ item }) => {
    const [isExpended, setExpended] = useState<boolean>(false);
    const [isTimeOut, setTimeOut] = useState<boolean>(false);

    function handleExpand() {
        setExpended(!isExpended);
        setTimeout(() => {
            setTimeOut(!isTimeOut);
        }, 100);
    }

    return (
        <li className={`${isExpended ? "h-56" : "h-12"} duration-300 list-none`}>
            <div onClick={handleExpand} className=" py-2 px-3 flex duration-300 rounded-md hover:bg-purple-600 items-center justify-between">
                <Link href={item.href}>{item.label}</Link>
                {item.isDropDown ? <HiOutlineChevronDown className="mt-1 -rotate-180 group-hover:rotate-0 duration-300" size={15} /> : ""}
            </div>
            <div className="flex flex-col space-y-1 mt-2">
                {isTimeOut && item.dropDownData?.map((subItem: NavbarItemType, index: number) => (
                    <Link key={index} className="hover:bg-gray-50 rounded-md py-1 px-5 duration-300 " href={subItem.href}>
                        {subItem.label}
                    </Link>
                ))}
            </div>
        </li>
    )
}

export default Expand