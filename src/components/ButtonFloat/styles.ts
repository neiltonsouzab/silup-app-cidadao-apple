import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled(RectButton)`
  align-items: center;
  justify-content: center;

  height: 64px;
  width: 64px;

  background: #2e8c24;
  border-radius: 20px;
  

  position: absolute;

  bottom: 32px;
  right: 32px;
`;
