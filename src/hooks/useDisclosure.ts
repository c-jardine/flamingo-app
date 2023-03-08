import React from 'react';

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const onOpen = () => {
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
  };

  return { isOpen, onOpen, onClose };
};
