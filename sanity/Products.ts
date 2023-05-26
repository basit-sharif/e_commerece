export default {
    name: 'products',
    type: 'document',
    title: 'Products',
    fields: [
        {
            name: 'productName',
            type: 'string',
            title: 'ProductName'
        },
        {
            title: 'Slug',
            name: 'slug',
            type: 'slug',
            options: {
                source: 'productName',
                maxLength: 200, // will be ignored if slugify is set
                slugify: (input: any) => input
                    .toLowerCase()
                    .replace(/\s+/g, '-')
                    .slice(0, 200)
            }
        },
        {
            name: 'description',
            type: 'array',
            title: 'Description',
            of: [
                {
                    type: "block"
                }
            ]
        },
        {
            name: 'image',
            type: 'array',
            title: 'Image',
            of: [
                {
                    type: 'image',
                    fields: [
                        {
                            name: "alt",
                            type: "text",
                            title: "Alternative text",
                        }
                    ]
                }
            ]
        },
        {
            name: 'productTypes',
            type: 'array',
            title: 'ProductType',
            of: [{ type: 'string' }]
        },
        {
            name: 'price',
            type: 'number',
            title: 'Price'
        },
        {
            name: 'size',
            type: 'array',
            title: 'Sizes',
            of: [{ type: 'string' }]
        },
        {
            name: 'quantity',
            type: 'number',
            title: 'Quantity'
        },
    ]
}