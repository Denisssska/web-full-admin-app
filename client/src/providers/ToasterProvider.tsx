import { Toaster } from 'react-hot-toast';
const toastOpt = {
  // Define default options
  className: '',
  duration: 5000,
  style: {
    background: '#363636',
    color: '#fff',
  },

  // Default options for specific types
  success: {
    // icon: '🔥',
    duration: 3000,
    theme: {
      primary: 'green',
      secondary: 'black',
    },
  },
};
export const ToasterProvider = () => {
  return <Toaster toastOptions={toastOpt} position='bottom-center' />;
};
