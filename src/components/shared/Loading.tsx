import Image from "next/image"
import { PreLoader } from "../assets"
import { FC } from "react"

const Loading: FC<{ size: string }> = ({ size }) => {
    return (
        <div className={`${size}`}>
            <Image src={PreLoader} alt="Preloader" />
        </div>
    )
}

export default Loading