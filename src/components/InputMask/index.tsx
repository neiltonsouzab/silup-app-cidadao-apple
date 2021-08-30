import React, { useRef, useImperativeHandle, forwardRef } from 'react';
import { TextInputMask, TextInputMaskProps } from 'react-native-masked-text';

import InputText from '../InputText';

interface InputMaskProps extends TextInputMaskProps {
  icon?: string;
}

interface InputMaskRef {
  focus(): void;
}

const InputMask: React.ForwardRefRenderFunction<InputMaskRef, InputMaskProps> =
  ({ ...rest }, ref) => {
    const inputElementRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      focus() {
        inputElementRef.current.focus();
      },
    }));

    return (
      <TextInputMask
        customTextInput={InputText}
        customTextInputProps={{
          ref: inputElementRef,
          ...rest,
        }}
        {...rest}
      />
    );
  };

export default forwardRef(InputMask);
