export default {
    name: 'servicesproduct',
    title: 'Servicesproduct',
    type: 'document',
    fields: [
      {
        name: 'productId', // Change from '_id' to 'productId'
        title: 'Product ID',
        type: 'string',
        validation: (Rule) => Rule.required(),
      },
      {
        name: 'image',
        title: 'Image',
        type: 'array',
        of: [{ type: 'image' }],
        options: {
          hotspot: true,
        },
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (rule) => rule.required(),
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 90,
        },
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
        validation: (rule) => rule.required(),
      },
      {
        name: 'frequency',
        title: 'Frequency',
        type: 'string',
      },
      {
        name: 'duration',
        title: 'Duration',
        type: 'string',
      },
      {
        name: 'warranty',
        title: 'Warranty',
        type: 'string',
      },
      {
        name: 'services',
        title: 'Services',
        type: 'string',
      },
      {
        name: 'type',
        title: 'Services',
        validation: (rule) => rule.required(),
        type: 'reference',
        to: [{ type: 'services' }],
      },
      {
        name: 'rating',
        type: 'number',
        title: 'Enter a number between 1 to 5',
        validation: (rule) =>
          rule.required().min(1).max(5).error('Please enter a value between 1 to 5'),
      },
      {
        name: 'reviews',
        type: 'string',
        title: 'Reviews',
      },
    ],
  };
 
 
