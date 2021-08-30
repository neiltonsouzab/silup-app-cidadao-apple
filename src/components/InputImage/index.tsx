import React, { useState, useCallback } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import * as RNFS from 'react-native-fs';

import { Container, Label, PreviewContainer, PreviewImage } from './styles';

type ImageData = ImageOrVideo & {
  data: string;
};

interface ImageProps {
  name: string;
  uri: string;
}

interface InputImageProps {
  label: string;
  onImageCapture?(image: ImageProps): void;
}

const InputImage: React.FC<InputImageProps> = ({ label, onImageCapture }) => {
  const [imagePreview, setImagePreview] = useState('');

  const handleUploadImage = useCallback(async () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then(async image => {
        const imageData = image as ImageData;

        const filename = `${new Date().getTime()}.jpg`;
        const dirPath = `${RNFS.ExternalCachesDirectoryPath}/images`;
        const filePath = `${dirPath}/${filename}`;

        await RNFS.mkdir(dirPath);

        await RNFS.writeFile(filePath, imageData.data || '', 'base64');

        setImagePreview(imageData.path);

        onImageCapture &&
          onImageCapture({ name: filename, uri: imageData.path });
      })
      .catch(() => {
        return;
      });
  }, [onImageCapture]);

  if (imagePreview) {
    return (
      <PreviewContainer onPress={handleUploadImage}>
        <PreviewImage source={{ uri: imagePreview }} />
      </PreviewContainer>
    );
  }

  return (
    <Container onPress={handleUploadImage}>
      <Icon size={24} color="#2e8c24" name="camera" />
      <Label>{label}</Label>
    </Container>
  );
};

export default InputImage;
