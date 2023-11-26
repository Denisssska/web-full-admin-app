
import { useAppSelector } from '../../store/hooks/hooks';

import { loadingSelector } from '../../store/selectors';

import './preloader.scss';

export const Preloader = () => {
  const loading = useAppSelector(loadingSelector);
  return (
    <div className={loading ? 'preloader' : 'hidden'}>
      <img src="/preloader.svg" alt="loading" />
    </div>
  );
};
