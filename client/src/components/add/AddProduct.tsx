import { zodResolver } from '@hookform/resolvers/zod';

import './add.scss';

import { FC, useId } from 'react';

import { useForm } from 'react-hook-form';

import toast from 'react-hot-toast';

import { useActionCreators } from '../../store/hooks/hooks';

import { updateProductImgTC, updateProductTC } from '../../store/slices';

import { productsSchema, ProductsSchemaType } from '../../utils/validate/productsSchema';

type Props = {
  title: string;
  color: string;
  producer: string;
  inStock: boolean;
  createdAt: string;
  id: string;
  price: string;
  img: string;
  createdBy?: string;
  onClose: () => void;
};

export const AddProduct: FC<Props> = ({
  onClose,
  color,
  createdAt,
  id,
  img,
  inStock,
  price,
  producer,
  title,
  createdBy,
}) => {
  const actions = useActionCreators({ updateProductImgTC, updateProductTC });
  const customId = useId();

  const updateDefValues = {
    color,
    createdAt,
    _id: id,
    img,
    inStock,
    price,
    producer,
    title,
    user: createdBy,
  };

  const {
    register,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<ProductsSchemaType>({
    mode: 'onTouched',
    shouldFocusError: true, //параметр определяет, следует ли устанавливать фокус на первое поле с ошибкой после отправки формы.
    resolver: zodResolver(productsSchema),
    defaultValues: updateDefValues,
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
      toast.error(`Не удалось обновить ${watch('title')}!`);
    } else {
      toast.success(`${watch('title')} успешно обновлен!`);
    }
  };
  const onSubmit = async (data: ProductsSchemaType) => {
    console.log(data);
    if (data.img instanceof FileList) {
      const savedPhoto = await uploadImageToCloudinary(data.img[0]);
      if (savedPhoto.payload === 'Failed to fetch') {
        toast.error(`Не удалось обновить ${watch('title')}!`);
        return;
      }
      const createdProduct = { ...data, img: savedPhoto.payload };
      const savedUpdates = await actions.updateProductTC(createdProduct);
      await Promise.all([savedPhoto, savedUpdates]).then(res => {
        watchToast(res[1]);
      });
    } else {
      await actions
        .updateProductTC({
          ...data,
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
        <label className="label-img" htmlFor={`${customId}-img`}>
          <img src={watch('img')} alt="img" />
        </label>
        <input
          accept="image/*"
          hidden
          id={`${customId}-img`}
          type="file"
          placeholder="img"
          {...register('img')}
        />
        {errors[`img`] && (
          <p className="errorMessage" id={`${customId}-profilePhoto`} aria-live="assertive">
            {String(errors.img.message)}
          </p>
        )}
      </div>
      <div className="item">
        <label htmlFor={`${customId}-title`}>Product name</label>
        <input id={`${customId}-title`} type="text" placeholder="product name" {...register('title')} />
        {errors[`title`] && (
          <p className="errorMessage" id={`${customId}-title`} aria-live="assertive">
            {String(errors.title.message)}
          </p>
        )}
        <label htmlFor={`${customId}-color`}>Color</label>
        <input id={`${customId}-color`} type="text" placeholder="color" {...register('color')} />
        {errors[`color`] && (
          <p className="errorMessage" id={`${customId}-color`} aria-live="assertive">
            {String(errors.color.message)}
          </p>
        )}
        <label htmlFor={`${customId}-id`}>Price</label>
        <input id={`${customId}-price`} type="text" placeholder="price" {...register('price')} />
        {errors[`price`] && (
          <p className="errorMessage" id={`${customId}-price`} aria-live="assertive">
            {String(errors.price.message)}
          </p>
        )}
      </div>

      <div className="item checkbox">
        <label htmlFor={`${customId}-id`}>In Stock</label>
        <input id={`${customId}-inStock`} type="checkbox" {...register('inStock')} />
        {errors[`inStock`] && (
          <p className="errorMessage" id={`${customId}-inStock`} aria-live="assertive">
            {String(errors.inStock.message)}
          </p>
        )}
      </div>
      <div className="item">
        <label htmlFor={`${customId}-id`}>Producer</label>
        <input id={`${customId}-producer`} type="text" {...register('producer')} />
        {errors[`producer`] && (
          <p className="errorMessage" id={`${customId}-producer`} aria-live="assertive">
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
