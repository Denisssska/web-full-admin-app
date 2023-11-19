import { z } from 'zod';

// eslint-disable-next-line no-useless-escape
const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
// eslint-disable-next-line no-useless-escape
const base64ImageRegExp = /^data:image\/([a-zA-Z]*);base64,([^\"]*)/;

export const profileSchema = z.object({
  username: z
    .string()
    .min(2, 'Поле "first Name" должно содержать хотя бы 2 буквы')
    .max(64, 'Поле "first Name" содержать больше 64 букв')
    .refine(value => /^[a-zA-ZА-Яа-я]+$/.test(value), {
      message: 'Поле "User Name" должно содержать только буквы',
    }),
  email: z
    .string()
    .min(1, 'Поле "Email" обязательное')
    .regex(emailRegex, { message: 'Укажите свой настоящий email' }),
  createdAt: z.string().optional(),
  _id: z.string(),
  profilePhoto: z.any()
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
