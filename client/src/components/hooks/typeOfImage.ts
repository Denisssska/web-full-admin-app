export  const typeOfImage = (data: string | FileList ) => {
  let image = '';
  if (typeof data === 'string') {
    image = data;
  }
  if (typeof data === 'object' && data[0] instanceof File) {
    const selectedFile = data[0];
    image = URL.createObjectURL(selectedFile);
  }
  return image;
};
