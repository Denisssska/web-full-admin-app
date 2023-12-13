import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useParams } from 'react-router-dom';

import { Single } from '../../components';

import { singleUserAndProductInfo } from '../../data';

import './user.scss';

import { useActionCreators, useAppSelector } from '../../store/hooks/hooks';

import { enjoyedUserSelector, loadingSelector } from '../../store/selectors';

import { getUserTC } from '../../store/slices';

const User = () => {
  const { id } = useParams();
  const loading = useSelector(loadingSelector);
  const enjoyedUser = useAppSelector(enjoyedUserSelector);
  const actions = useActionCreators({ getUserTC });

  useEffect(() => {
    if (!Object.keys(enjoyedUser).length || (Object.keys(enjoyedUser).length && id !== enjoyedUser._id)) {
      id && actions.getUserTC(id);
    }
    return () => console.clear();
  }, [id]);

  const res = {
    ...singleUserAndProductInfo,
    ...enjoyedUser,
  };
  return <div className="user">{loading ? 'Loading...' : <Single slug="user" {...res} />}</div>;
};
export default User;
