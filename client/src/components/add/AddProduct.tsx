import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import './add.scss';

import { FC } from 'react';

import { useForm } from 'react-hook-form';

import { productColumns } from '../../pages/products/Products';

import { productsSchema, ProductsSchemaType } from '../../utils/validate/productsSchema';

type Props = {
  number?: number;
  title?: string;
  color?: string;
  producer?: string;
  inStock?: boolean;
  createdAt?: string;
  id?: number;
  price?: string;
  img?: string;
  slug: string;
  onClose: () => void;
  itemLength?: number;
};
type RegisterType =
  | 'number'
  | 'title'
  | 'color'
  | 'producer'
  | 'inStock'
  | 'createdAt'
  | 'id'
  | 'price'
  | 'img';

export const AddProduct: FC<Props> = ({
  onClose,
  color,
  createdAt,
  id,
  img,
  inStock,
  number,
  price,
  producer,
  title,
  slug,
  itemLength,
}) => {
  const updateDefValues = {
    color,
    createdAt,
    id,
    img,
    inStock,
    number: number ? number : 100,
    price,
    producer,
    title,
  };
  const getDefValues = () => {
    if (id) {
      return updateDefValues;
    } else {
      return {
        id: randomValue,
        number: itemLength! + 1,
      };
    }
  };
  const randomValue = Math.floor(Math.random() * 1000);
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    trigger,
    formState: { isSubmitting, errors },
  } = useForm<ProductsSchemaType>({
    mode: 'onTouched',
    shouldFocusError: true, //параметр определяет, следует ли устанавливать фокус на первое поле с ошибкой после отправки формы.
    resolver: zodResolver(productsSchema),
    defaultValues: getDefValues(),
  });

  const queryClient = useQueryClient();

  //доделать типизацию
  // и решить вопрос с вынесением компоненты по добавлению юзера или пользователя отдельно
  // добавить фото в форму создания
  // доделать айдишники
  // доделать логин и регистрацию
  const addProduct = async (params: ProductsSchemaType) => {
    const data = await fetch(`http://localhost:8800/api/${slug}s`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    console.log(data);
    return data;
  };
  const updateProduct = async (params: ProductsSchemaType) => {
    const data = await fetch(`http://localhost:8800/api/${slug}s/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    console.log(data);
    return data;
  };
  const mutation = useMutation({
    mutationFn: id ? updateProduct : addProduct,
    // () => {
    //   return fetch(`http://localhost:8800/api/${props.slug}s`, {
    //     method: "post",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       id: 111,
    //       img: "",
    //       lastName: "Hello",
    //       firstName: "Test",
    //       email: "testme@gmail.com",
    //       phone: "123 456 789",
    //       createdAt: "01.02.2023",
    //       verified: true,
    //     }),
    //   });
    // },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`all${slug}s`] });
      queryClient.invalidateQueries({ queryKey: [`${slug}`] });
    },
  });
  // console.log(watch('img') && watch('img')[0])

  const onSubmit = (data: ProductsSchemaType) => {
    const body = {
      ...data,
      // img: data.img && watch('img')[0],
      // id: randomValue,
      // number: props.itemLength + 1,
    };

    //add new item
    mutation.mutateAsync(body);
    onClose();
  };
  // console.log(props.itemLength, id)
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {productColumns
        // .filter(item => item.field !== 'id' && item.field !== 'number')
        .map((column, id) => {
          return (
            <div key={id} className="item">
              <label htmlFor={`${id}-${column.field}`}>{column.headerName}</label>
              <input
                readOnly={column.field === 'id' ? true : column.field === 'number' ? true : false}
                id={`${id}-${column.field}`}
                type={column.type === 'boolean' ? 'checkbox' : column.type}
                placeholder={
                  column.field === 'id'
                    ? String(randomValue)
                    : column.field === 'number'
                    ? String(itemLength! + 1)
                    : column.field
                }
                {...register(column.field as RegisterType)}
              />
              {errors[`${column.field as keyof typeof errors}`] && (
                <p className="errorMessage" id={`${id}-${column.field}`} aria-live="assertive">
                  {String(errors[column.field as keyof typeof errors]?.message)}
                </p>
              )}
            </div>
          );
        })}
      <button disabled={isSubmitting} type="submit">
        Send
      </button>
    </form>
  );
};
