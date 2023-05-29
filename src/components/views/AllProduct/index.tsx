"use client"
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType"
import { Component } from "react"

interface propsType {
    productArray: Array<oneProductType>
}

export default class AllProductsCompo extends Component<{ ProdutcData: propsType }> {
    getData = () => {
        console.log(this.props.ProdutcData.productArray[0].price)
    }
    render() {
        return (
            <div onClick={this.getData}>{this.props.ProdutcData.productArray[0].price}</div>
        )
    }
}