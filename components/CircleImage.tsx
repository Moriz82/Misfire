import React from 'react';
import {Image, StyleSheet, View, ImageSourcePropType} from 'react-native';

interface CircleImageProps {
  source: ImageSourcePropType;
  size: number;
}

const CircleImage = ({source, size}: CircleImageProps) => {
  return (
    <View style={[styles.circle, {width: size, height: size}]}>
      <Image source={source} style={styles.image} alt={'err'} />
    </View>
  );
};

const styles = StyleSheet.create({
  circle: {
    borderRadius: 100,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default CircleImage;
