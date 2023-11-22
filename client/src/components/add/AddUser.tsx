import { zodResolver } from '@hookform/resolvers/zod';

import './add.scss';

import { FC } from 'react';

import { useForm } from 'react-hook-form';

import { usersColumns } from '../../pages/users/Users';

import { ProfileSchemaType } from '../../utils';

import { usersSchema, UsersSchemaType } from '../../utils/validate/usersSchema';
type Props = {
  slug: string;
  createdAt: string;
  email: string;
  firstname: string;
  id: string;
  profilePhoto: string;
  lastname: string;
  phone: string;
  onClose: () => void;
};
type RegisterUserType = 'createdAt' | '_id' | 'firstname' | 'lastname' | 'email' | 'phone' | 'profilePhoto';

export const AddUser: FC<Props> = ({
  slug,
  createdAt,
  email,
  firstname,
  id,
  profilePhoto,
  onClose,
  lastname,
  phone,
}) => {
  // const randomValue = Math.floor(Math.random() * 1000);
  const updateDefValues = {
    firstname,
    lastname,
    email,
    createdAt,
    profilePhoto,
    _id: id,
    phone,
  };
  console.log(updateDefValues);

  const getDefValues = () => {
    if (id) {
      return updateDefValues;
    }
  };
  const {
    register,
    handleSubmit,

    formState: { isSubmitting, errors },
  } = useForm<ProfileSchemaType>({
    mode: 'onTouched',
    shouldFocusError: true, //параметр определяет, следует ли устанавливать фокус на первое поле с ошибкой после отправки формы.
    resolver: zodResolver(usersSchema),
    defaultValues: getDefValues(),
  });

  const addUser = async (params: UsersSchemaType) => {
    console.log(params);
  };
  const updateUser = async (params: UsersSchemaType) => {
    console.log(params);
  };
  const onSubmit = (data: ProfileSchemaType) => {
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {usersColumns
        .filter(item => item.field !== 'number')
        .map((column, id) => {
          return (
            <div key={id} className="item">
              <label htmlFor={`${id}-${column.field}`}>{column.headerName}</label>
              <input
                readOnly={column.field === '_id' ? true : column.field === 'createdAt' ? true : false}
                id={`${id}-${column.field}`}
                type={column.type === 'boolean' ? 'checkbox' : column.type}
                placeholder={column.field}
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
