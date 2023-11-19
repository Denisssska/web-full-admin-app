import { useRouteError } from 'react-router-dom';

import './error.scss';
export const ErrorBoundary = () => {
  const error = useRouteError();
  return (
    <div className="error" id="error-page">
      <h1>Oops!</h1>

      <p>
        Page&nbsp;
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
