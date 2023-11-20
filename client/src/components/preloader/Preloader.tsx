import { loadingSelector, useAppSelector } from '../../store';

import './preloader.scss';

export const Preloader = () => {
  const loading = useAppSelector(loadingSelector);
  return (
    <div className={loading ? 'preloader' : 'hidden'}>
      <img src="/preloader.svg" alt="loading" />
    </div>
  );
};
