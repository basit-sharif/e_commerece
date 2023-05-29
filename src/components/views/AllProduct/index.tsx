"use client"
import { oneProductType } from "@/components/utils/ProductsDataArrayAndType"
import { Component } from "react"

export default class AllProductsCompo extends Component<{ ProdutcData: Array<oneProductType> }> {
    getData = () => {
        console.log(this.props.ProdutcData)
    }
    render() {
        return (
            <div onClick={this.getData}>Hi</div>
        )
    }
}