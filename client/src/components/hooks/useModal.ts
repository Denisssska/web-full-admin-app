import { useState } from 'react';

export function useModal() {
  const [name, setName] = useState(false);
  function isOpen() {
    return name;
  }
  function onOpen() {
    setName(true);
  }
  function onClose() {
    setName(false);
  }
  return { isOpen, onOpen, onClose };
}
