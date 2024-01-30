import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  fields: [

   {
      name: 'serviceId', 
      title: 'Service ID',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },


    {
      name: 'name',
      type: 'string',
      title: 'Services name',
      validation: rule=> rule.required(),
   },
   {
      name: 'description',
      type: 'string',
      title: 'Description',
      validation: rule=> rule.max(200),
   },
   {
      name: 'image',
      type: 'image',
      title: 'image of the services',
   }
  ],
})