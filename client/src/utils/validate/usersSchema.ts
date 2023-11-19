import { z } from 'zod';

const phoneRegex = /^\+?[0-9]{10,12}$/;

// eslint-disable-next-line no-useless-escape
const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const usersSchema = z.object({
  firstName: z
    .string()
    .min(2, 'Поле "first Name" должно содержать хотя бы 2 буквы')
    .max(64, 'Поле "first Name" содержать больше 64 букв')
    .refine(value => /^[a-zA-ZА-Яа-я]+$/.test(value), {
      message: 'Поле "first Name" должно содержать только буквы',
    }),
  lastName: z
    .string()
    .min(2, 'Поле "lastName" должно содержать хотя бы 2 буквы')
    .max(64, 'Поле "lastName" содержать больше 64 букв')
    .refine(value => /^[a-zA-ZА-Яа-я]+$/.test(value), {
      message: 'Поле "lastName" должно содержать только буквы',
    }),
  email: z
    .string()
    .min(1, 'Поле "Email" обязательное')
    .regex(emailRegex, { message: 'Укажите свой настоящий email' }),
  phone: z
    .string()
    .min(1, 'Поле "Номер телефона" обязательное')
    .regex(phoneRegex, { message: 'Укажите номер телефона' }),
  verified: z.boolean(),
  createdAt: z.string().min(1, 'Поле "createdAt" обязательное'),
  id: z.any().optional(),
  number: z.any().optional(),
  img: z.any(),
});

export type UsersSchemaType = z.infer<typeof usersSchema>;
