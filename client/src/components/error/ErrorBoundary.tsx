import { useRouteError } from 'react-router-dom';

import './error.scss';
export const ErrorBoundary = () => {
  const error = useRouteError();
  console.log(error);

  return (
    <div className="error" id="error-page">
      <h1>Oops man!</h1>

      <p>
        Problem&nbsp;
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
