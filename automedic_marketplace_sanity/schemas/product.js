export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{type: 'image'}],
            options: {
                hotspot: true,
            }
        },
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            validation: rule=> rule.required(),
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'name',
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
            validation: rule=> rule.required(),
        },

        {
            name: 'rating',
            type: 'number',
            title: 'Enter a number between 1 to 5',
            validation: rule=>rule.required().min(1).max(5).error('Please enter a value between 1 to 5')
          },

          {
            name: 'reviews',
            type: 'string',
            title: 'Reviews'
          },
          {
            name: 'type',
            title: 'Category',
            validation: rule=> rule.required(),
            type: 'reference',
            to: [{type: 'category'}]
          },
    
    ]
}