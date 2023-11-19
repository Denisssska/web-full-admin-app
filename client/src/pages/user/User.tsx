import { useQuery } from '@tanstack/react-query';

import { useLocation } from 'react-router-dom';

import { Single } from '../../components';

import { singleUser } from '../../data';

import './user.scss';

export const User = () => {
  // const queryClient = useQueryClient()
  // const selectedUser = queryClient.getQueryData(['user'])
  const location = useLocation();
  const id = location.pathname.slice(7);
  //Fetch data and send to Single Component
  const { isLoading, data } = useQuery({
    queryKey: ['user', id],
    queryFn: () => fetch(`http://localhost:8800/api/users/${id}`).then(res => res.json()),
  });
  
  const res = {
    ...singleUser,
    id: data?.id,
    title: data?.firstName,
    img: data?.img,
    lastName: data?.lastName,
    createdAt: data?.createdAt,
    info: { userName: data?.firstName, email: data?.email, phone: data?.phone },
  };
  return <div className="user">{isLoading ? 'Loading...' : <Single slug="user" {...res} />}</div>;
};
