import React, {
  useState,
  useMemo,
  useRef,
  useImperativeHandle,
  forwardRef,
} from 'react';
import { TextInputProps } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Container, Input } from './styles';

interface InputTextProps extends TextInputProps {
  icon?: string;
}

interface InputTextRef {
  focus(): void;
}

const InputText: React.ForwardRefRenderFunction<InputTextRef, InputTextProps> =
  ({ value, icon, ...rest }, ref) => {
    const [isFocused, setIsFocused] = useState(false);
    const inputElementRef = useRef<any>(null);

    useImperativeHandle(ref, () => ({
      focus() {
        inputElementRef.current.focus();
      },
    }));

    const isFilled = useMemo(() => {
      if (!value) {
        return false;
      }

      return true;
    }, [value]);

    return (
      <Container>
        <Input
          {...rest}
          placeholderTextColor="#c4c4c4"
          ref={inputElementRef}
          value={value}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
        {icon && (
          <Icon
            name={icon}
            size={16}
            color={isFilled || isFocused ? '#2e8c24' : '#c4c4c4'}
          />
        )}
      </Container>
    );
  };

export default forwardRef(InputText);
