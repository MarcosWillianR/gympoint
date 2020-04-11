import React, { useEffect, useRef } from 'react';
import ReactInputMask from 'react-input-mask';

import { useField } from '@unform/core';

import { Container, ErrorMessage } from './styles';

export default function Input({ name, ...rest }) {
  const inputRef = useRef(null);
  const { fieldName, registerField, defaultValue, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [fieldName, registerField]);

  return (
    <Container>
      <ReactInputMask ref={inputRef} defaultValue={defaultValue} {...rest}/>

      { error && <ErrorMessage>{error}</ErrorMessage> }
    </Container>
  );
}
