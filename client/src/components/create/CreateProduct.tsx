import { zodResolver } from '@hookform/resolvers/zod';

import { useId } from 'react';

import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';

import { useActionCreators, useAppSelector } from '../../store/hooks/hooks';

import { profileIDSelector } from '../../store/selectors';

import { createProductTC, updateProductImgTC } from '../../store/slices';

import { ProductsSchemaType, productsSchema } from '../../utils';

import '../add/add.scss';

import { typeOfImage } from '../hooks/typeOfImage';

type CreateProps = {
  onClose: () => void;
};

export const CreateProduct: React.FC<CreateProps> = ({ onClose }) => {
  const actions = useActionCreators({ updateProductImgTC, createProductTC });
  const id = useId();
  const userId = useAppSelector(profileIDSelector);
  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ProductsSchemaType>({
    mode: 'onTouched',
    shouldFocusError: true, //параметр определяет, следует ли устанавливать фокус на первое поле с ошибкой после отправки формы.
    resolver: zodResolver(productsSchema),
    defaultValues: {
      img: 'https://img.freepik.com/premium-vector/shirt-design-skull-skateboarder-badge_9645-1351.jpg?w=826',
    },
  });
  const uploadImageToCloudinary = async (image: File) => {
    const data: UploadImageData = {
      file: image,
      upload_preset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      folder: 'Cloudinary-admin-products',
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return await actions.updateProductImgTC(formData);
  };

  const watchToast = (value: any) => {
    if (value.error) {
      toast.error(`Не удалось создать ${watch('title')}!`);
    } else {
      toast.success(`${watch('title')} успешно создан!`);
    }
  };
  const onSubmit = async (data: ProductsSchemaType) => {
    console.log(data);
    if (data.img instanceof FileList) {
      const savedPhoto = await uploadImageToCloudinary(data.img[0]);
      if (savedPhoto.payload === 'Failed to fetch') {
        toast.error(`Не удалось создать ${watch('title')}!`);
        return;
      }
      const createdProduct = { ...data, img: savedPhoto.payload, user: userId };
      const savedUpdates = await actions.createProductTC(createdProduct);
      await Promise.all([savedPhoto, savedUpdates]).then(res => {
        watchToast(res[1]);
      });
    } else {
      await actions
        .createProductTC({
          ...data,
          user: userId,
          img: watch('img'),
        })
        .then(res => {
          watchToast(res);
        });
    }
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="item">
        <label className="label-img" htmlFor={`${id}-img`}>
          <img src={typeOfImage(watch('img'))} alt="img" />
        </label>
        <input accept="image/*" hidden id={`${id}-img`} type="file" placeholder="img" {...register('img')} />
        {errors[`img`] && (
          <p className="errorMessage" id={`${id}-profilePhoto`} aria-live="assertive">
            {String(errors.img.message)}
          </p>
        )}
      </div>
      <div className="item">
        <label htmlFor={`${id}-title`}>Product name</label>
        <input id={`${id}-title`} type="text" placeholder="product name" {...register('title')} />
        {errors[`title`] && (
          <p className="errorMessage" id={`${id}-title`} aria-live="assertive">
            {String(errors.title.message)}
          </p>
        )}
        <label htmlFor={`${id}-color`}>Color</label>
        <input id={`${id}-color`} type="text" placeholder="color" {...register('color')} />
        {errors[`color`] && (
          <p className="errorMessage" id={`${id}-color`} aria-live="assertive">
            {String(errors.color.message)}
          </p>
        )}
        <label htmlFor={`${id}-id`}>Price</label>
        <input id={`${id}-price`} type="text" placeholder="price" {...register('price')} />
        {errors[`price`] && (
          <p className="errorMessage" id={`${id}-price`} aria-live="assertive">
            {String(errors.price.message)}
          </p>
        )}
      </div>

      <div className="item checkbox">
        <label htmlFor={`${id}-id`}>In Stock</label>
        <input id={`${id}-inStock`} type="checkbox" {...register('inStock')} />
        {errors[`inStock`] && (
          <p className="errorMessage" id={`${id}-inStock`} aria-live="assertive">
            {String(errors.inStock.message)}
          </p>
        )}
      </div>
      <div className="item">
        <label htmlFor={`${id}-id`}>Producer</label>
        <input id={`${id}-producer`} type="text" {...register('producer')} />
        {errors[`producer`] && (
          <p className="errorMessage" id={`${id}-producer`} aria-live="assertive">
            {String(errors.producer.message)}
          </p>
        )}
      </div>
      <button disabled={isSubmitting} type="submit">
        Send
      </button>
    </form>
  );
};
