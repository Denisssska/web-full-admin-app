import { z } from 'zod';

const priceRegex = /^\$?[0-9]+$/;

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
  createdAt: z.string().min(1, 'Поле "createdAt" обязательное').optional(),
  _id: z.string().optional(),
  user: z.string().optional(),
  viewsCount: z.number().optional(),
  price: z.string().min(1, 'Поле "price" обязательное'),
  // .regex(priceRegex, { message: 'Укажите корректный price' }),
  img: z.any().optional(),
});

export type ProductsSchemaType = z.infer<typeof productsSchema>;
