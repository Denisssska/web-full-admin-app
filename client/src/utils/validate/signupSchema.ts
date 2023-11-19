import { z } from 'zod';

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,32}/;
// eslint-disable-next-line no-useless-escape
const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;

export const signupSchema = z.object({
  username: z.string().min(1, 'Поле "username" обязательное'),
  // .regex(emailRegex, { message: 'Укажите свой настоящий email' }),
  email: z
    .string()
    .min(1, 'Поле "Email" обязательное')
    .regex(emailRegex, { message: 'Укажите свой настоящий email' }),
  password: z.string().min(8, 'минимальная длина поля 8 символов').regex(passwordRegex, {
    message: 'Пароль должен содержать минимум 8 символов, в том числе буквы латинского алфавита и цифры',
  }),
  // confirmPassword1: z.string(),
});
// .refine(data => data.password1 === data.confirmPassword1, {
// 	message: 'Пароль должен совпадать',
// 	path: ['confirmPassword1'],
// })

export type SignUpSchemaType = z.infer<typeof signupSchema>;
