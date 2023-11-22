import { useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useLocation, useParams } from 'react-router-dom';

import { Single } from '../../components';

import { singleUserAndProductInfo } from '../../data';

import './user.scss';

import { enjoyedUserSelector, loadingSelector, useActionCreators, useAppSelector } from '../../store';

import { getUserTC } from '../../store/slices/userReducer';


export const User = () => {
  const {id} = useParams();
  const loading = useSelector(loadingSelector);
  const enjoyedUser = useAppSelector(enjoyedUserSelector);
  const actions = useActionCreators({getUserTC});

  useEffect(() => {
    id && actions.getUserTC(id);
  }, [id, actions]);

  const res = {
    ...singleUserAndProductInfo,
    ...enjoyedUser,
  };
  return <div className="user">{loading ? 'Loading...' : <Single slug="user" {...res} />}</div>;
};
