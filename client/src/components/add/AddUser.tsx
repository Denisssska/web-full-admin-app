import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import './add.scss';

import { FC } from 'react';

import { useForm } from 'react-hook-form';

import { usersColumns } from '../../pages/users/Users';

import { usersSchema, UsersSchemaType } from '../../utils/validate/usersSchema';
type Props = {
  slug: string;
  number?: number;
  createdAt?: string;
  id?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  verified?: boolean;
  img?: string;
  onClose: () => void;
  itemLength?: number;
};
type RegisterUserType =
  | 'number'
  | 'createdAt'
  | 'id'
  | 'firstName'
  | 'lastName'
  | 'email'
  | 'phone'
  | 'verified'
  | 'img';

export const AddUser: FC<Props> = ({
  onClose,
  slug,
  createdAt,
  email,
  firstName,
  id,
  img,
  itemLength,
  lastName,
  number,
  phone,
  verified,
}) => {
  const randomValue = Math.floor(Math.random() * 1000);
  const updateDefValues = {
    firstName,
    lastName,
    email,
    createdAt,
    img,
    id,
    number: number ? number : 100,
    phone,
    verified,
  };
  const getDefValues = () => {
    if (id) {
      return updateDefValues;
    } else {
      return {
        id: randomValue,
        number: itemLength && itemLength + 1,
      };
    }
  };
  const {
    register,
    handleSubmit,

    formState: { isSubmitting, errors },
  } = useForm<UsersSchemaType>({
    mode: 'onTouched',
    shouldFocusError: true, //параметр определяет, следует ли устанавливать фокус на первое поле с ошибкой после отправки формы.
    resolver: zodResolver(usersSchema),
    defaultValues: getDefValues(),
  });

  const queryClient = useQueryClient();

  const addUser = async (params: UsersSchemaType) => {
    console.log(params);
    const data = await fetch(`http://localhost:8800/api/${slug}s`, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return data;
  };
  const updateUser = async (params: UsersSchemaType) => {
    console.log(params);
    const data = await fetch(`http://localhost:8800/api/${slug}s/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    });
    return data;
  };
  const mutation = useMutation({
    mutationFn: id ? updateUser : addUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`all${slug}s`] });
      queryClient.invalidateQueries({ queryKey: [`${slug}`] });
    },
  });

  const onSubmit = (data: UsersSchemaType) => {
    const body = {
      ...data,
    };

    mutation.mutateAsync(body);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {usersColumns.map((column, id) => {
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
              {...register(column.field as RegisterUserType)}
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
