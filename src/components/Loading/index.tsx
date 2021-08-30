import React from 'react';
import { ActivityIndicator } from 'react-native';

import { Container, Message } from './styles';

interface LoadingProps {
  message: string;
}

const Loading: React.FC<LoadingProps> = ({ message }) => {
  return (
    <Container>
      <ActivityIndicator size="small" color="#2e8c24" />
      <Message>{message}</Message>
    </Container>
  );
};

export default Loading;
