import Image from "next/image"
import { FC } from "react"
import { PreLoader } from "../assets"

const LoadingComp: FC<{ size: string }> = ({ size }) => {
    return (
        <div className={`${size}`}>
            <Image src={PreLoader} alt="Pre loader" />
        </div>
    )
}

export default LoadingComp