import { z } from 'zod';

const phoneRegex = /^\+?[0-9]{10,15}$/;
const priceRegex = /^\$?[0-9]+$/;
const MAX_FILE_SIZE = 3000000;
function checkFileType(file: File) {
  // file type checking
  if (file?.name) {
    const fileType = file.name.split('.').pop();
    if (['gif', 'png', 'jpg'].includes(fileType)) return true;
  }
  return false;
}
export const productsSchema = z.object({
  title: z
    .string()
    .min(2, 'Поле "title" должно содержать хотя бы 2 буквы')
    .max(64, 'Поле "title" содержать больше 64 букв'),

  color: z
    .string()
    .min(2, 'Поле "color" должно содержать хотя бы 2 буквы')
    .max(64, 'Поле "color" содержать больше 64 букв')
    .refine(value => /^[a-zA-ZА-Яа-я]+$/.test(value), {
      message: 'Поле "color" должно содержать только буквы',
    }),
  producer: z
    .string()
    .min(2, 'Поле "producer" должно содержать хотя бы 2 буквы')
    .max(64, 'Поле "producer" содержать больше 64 букв')
    .refine(value => /^[a-zA-ZА-Яа-я]+$/.test(value), {
      message: 'Поле "producer" должно содержать только буквы',
    }),
  inStock: z.boolean(),
  createdAt: z.string().min(1, 'Поле "createdAt" обязательное'),
  id: z.any().optional(),
  number: z.any().optional(),
  price: z
    .string()
    .min(1, 'Поле "price" обязательное')
    .regex(priceRegex, { message: 'Укажите корректный price' }),
  img: z.any(),
  // .refine(file => file?.length !== 0, 'File is required')
  // .refine(file => file.size < MAX_FILE_SIZE, 'Max size is 3MB.')
  // .refine(file => checkFileType(file), 'Only .jpg, .gif, .png formats are supported.'),
  // .custom<File>(v => v instanceof File, {
  // 	message: 'Image is required',
  // }).optional(),
  // .regex(phoneRegex, { message: 'Укажите корректный price' }),
});

export type ProductsSchemaType = z.infer<typeof productsSchema>;
