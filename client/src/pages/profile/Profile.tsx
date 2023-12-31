import { zodResolver } from '@hookform/resolvers/zod';

import { useId } from 'react';

import { useForm } from 'react-hook-form';

import './profile.scss';

import toast from 'react-hot-toast';

import { typeOfImage } from '../../components/hooks/typeOfImage';

import { useActionCreators, useAppSelector } from '../../store/hooks/hooks';

import { loadingSelector, profileSelector } from '../../store/selectors';

import { updateUserImgTC, updateUserTC } from '../../store/slices';

import { ProfileSchemaType, profileSchema } from '../../utils';

const Profile = () => {
  const id = useId();
  const user = useAppSelector(profileSelector);
  const loading = useAppSelector(loadingSelector);
  const actions = useActionCreators({ updateUserImgTC, updateUserTC });

  const {
    register,
    handleSubmit,
    watch,
    formState: {  errors },
  } = useForm<ProfileSchemaType>({
    mode: 'onTouched',
    shouldFocusError: true, //параметр определяет, следует ли устанавливать фокус на первое поле с ошибкой после отправки формы.
    resolver: zodResolver(profileSchema),
    defaultValues: {
      _id: user._id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
      profilePhoto: user.profilePhoto,
      phone:user.phone,
      firstname:user.firstname,
      lastname:user.lastname
    },
  });

  const uploadImageToCloudinary = async (image: File) => {
    const data: UploadImageData = {
      file: image,
      upload_preset: import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET,
      cloud_name: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME,
      folder: 'Cloudinary-admin-users',
    };
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }
    return await actions.updateUserImgTC(formData);
  };
  const watchToast = (value: any) => {
    if (value.error) {
      toast.error(`Не удалось обновить ${user.username}!`);
    } else {
      toast.success(`${user.username} успешно обновлен!`);
    }
  };

  //два варианта: либо на бэк base64 либо на бэк урл ,а фото на cloudinary
  const onSubmit = async (data: ProfileSchemaType) => {
    if (data.profilePhoto instanceof FileList) {
      const savedPhoto = await uploadImageToCloudinary(data.profilePhoto[0]);
      if (savedPhoto.payload === 'Failed to fetch') {
        toast.error(`Не удалось обновить ${user.username}!`);
        return;
      }
      const updatedUser = { ...data, profilePhoto: savedPhoto.payload };
      const savedUpdates = await actions.updateUserTC(updatedUser);
      await Promise.all([savedPhoto, savedUpdates]).then(res => {
        watchToast(res[1]);
      });
    } else {
      await actions.updateUserTC(data).then(res => {
        watchToast(res);
      });
    }
  };

  return (
    <div className="main">
      <div className="profile">
        {/* <h1>Register</h1> */}
        <form autoComplete="false" onSubmit={handleSubmit(onSubmit)}>
          <div className="formItem">
            <label className="label-img" htmlFor={`${id}-profilePhoto`}>
              <img src={typeOfImage(watch('profilePhoto'))} alt="profile photo" />
            </label>
            <input
              accept="image/*"
              hidden
              id={`${id}-profilePhoto`}
              type="file"
              placeholder="profilePhoto"
              {...register('profilePhoto')}
            />
            {errors[`profilePhoto`] && (
              <p className="errorMessage" id={`${id}-profilePhoto`} aria-live="assertive">
                {String(errors.profilePhoto.message)}
              </p>
            )}
          </div>

          <div className="formItem">
            <label htmlFor={`${id}-id`}>ID</label>
            <input
              className="ID-Input"
              readOnly={true}
              id={`${id}-_id`}
              type="text"
              placeholder="id"
              {...register('_id')}
            />
            {errors[`_id`] && (
              <p className="errorMessage" id={`${id}-_id`} aria-live="assertive">
                {String(errors._id.message)}
              </p>
            )}
          </div>
          <div className="formItem">
            <label htmlFor={`${id}-username`}>Nick Name</label>
            <input id={`${id}-username`} type="text" placeholder="User name" {...register('username')} />
            {errors[`username`] && (
              <p className="errorMessage" id={`${id}-username`} aria-live="assertive">
                {String(errors.username.message)}
              </p>
            )}
          </div>
          <div className="formItem">
            <label htmlFor={`${id}-firstname`}>First Name</label>
            <input id={`${id}-firstname`} type="text" placeholder="First name" {...register('firstname')} />
            {errors[`firstname`] && (
              <p className="errorMessage" id={`${id}-firstname`} aria-live="assertive">
                {String(errors.firstname.message)}
              </p>
            )}
          </div>
          <div className="formItem">
            <label htmlFor={`${id}-lastname`}>Last Name</label>
            <input id={`${id}-lastname`} type="text" placeholder="Last name" {...register('lastname')} />
            {errors[`lastname`] && (
              <p className="errorMessage" id={`${id}-lastname`} aria-live="assertive">
                {String(errors.lastname.message)}
              </p>
            )}
          </div>
          <div className="formItem">
            <label htmlFor={`${id}-email`}>Email</label>
            <input
              id={`${id}-email`}
              type="text"
              placeholder="Email"
              {...register('email')}
            />
            {errors[`email`] && (
              <p className="errorMessage" id={`${id}-email`} aria-live="assertive">
                {String(errors.email.message)}
              </p>
            )}
          </div>
          <div className="formItem">
            <label htmlFor={`${id}-phone`}>Phone</label>
            <input
              autoComplete="false"
              id={`${id}-phone`}
              type="text"
              placeholder="Phone"
              {...register('phone')}
            />
            {errors[`phone`] && (
              <p className="errorMessage" id={`${id}-phone`} aria-live="assertive">
                {String(errors.phone.message)}
              </p>
            )}
          </div>

          <div className="formItem">
            <button disabled={loading} type="submit">
              Update
            </button>
          </div>
          <div className="formItem">
            <button onClick={() => alert('Точно удалить?')} className="signup" type="button">
              Delete
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Profile;
