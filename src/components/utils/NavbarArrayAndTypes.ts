export interface NavbarItemType {
    label: string,
    href: string,
    isDropDown: boolean,
    dropDownData?: Array<NavbarItemType>,
};


export const NavbarArray: Array<NavbarItemType> = [
    {
        label: "Female",
        href: "/female",
        isDropDown: true,
        dropDownData: [
            {
                label: "Dresses",
                href: "/female/dresses",
                isDropDown: false,
            },
            {
                label: "Shirts",
                href: "/female/shirts",
                isDropDown: false,
            },
            {
                label: "Pents",
                href: "/female/pents",
                isDropDown: false,
            },
            {
                label: "Jackets",
                href: "/female/jackets",
                isDropDown: false,
            },
        ]
    },
    {
        label: "Male",
        href: "/male",
        isDropDown: true,
        dropDownData: [
            {
                label: "Shorts",
                href: "/male/shorts",
                isDropDown: false,
            },
            {
                label: "Shirts",
                href: "/male/shirts",
                isDropDown: false,
            },
            {
                label: "Pents",
                href: "/male/pents",
                isDropDown: false,
            },
            {
                label: "Jackets",
                href: "/male/jackets",
                isDropDown: false,
            },
        ]
    },
    {
        label: "Kids",
        href: "/kids",
        isDropDown: false,
    },
    {
        label: "All Products",
        href: "/allproducts",
        isDropDown: false,
    },
];