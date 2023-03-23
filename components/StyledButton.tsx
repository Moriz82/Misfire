import React, {Children, cloneElement, isValidElement} from 'react';
import {Button, Text, View} from 'native-base';
import {GestureResponderEvent, StyleSheet} from 'react-native';

type Props = {
  buttonText: string;
  onPress: (event: GestureResponderEvent) => void;
  buttonColor: boolean;
};

export function StyledButton(props: Props) {
  return (
    <Button
      style={[
        styles.root,
        {backgroundColor: props.buttonColor ? '#FF6C1A' : '#FFA361'},
      ]}
      onPress={props.onPress}>
      <TextStroke stroke={3} color={'#000000'}>
        <Text style={styles.buttonText}>{props.buttonText}</Text>
      </TextStroke>
    </Button>
  );
}

const styles = StyleSheet.create({
  root: {
    height: 64,
    borderWidth: 3,
    borderColor: '#00000',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: 15,
    shadowColor: '#000000',
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 10,
  },
  buttonText: {
    color: 'rgb(255, 255, 255)',
    fontSize: 25,
    fontWeight: '700',
  },
});

export class TextStroke extends React.Component<Props> {
  createClones = (w: number, h: number, color?: string) => {
    // @ts-ignore
    const {children} = this.props;
    return Children.map(children, child => {
      if (isValidElement(child)) {
        const currentProps = child.props as any;
        const currentStyle = currentProps ? currentProps.style || {} : {};

        const newProps = {
          ...currentProps,
          style: {
            ...currentStyle,
            textShadowOffset: {
              width: w,
              height: h,
            },
            textShadowColor: color,
            textShadowRadius: 1,
          },
        };
        return cloneElement(child, newProps);
      }
      return child;
    });
  };

  render() {
    // @ts-ignore
    const {color, stroke, children} = this.props;
    const strokeW = stroke;
    const top = this.createClones(0, -strokeW * 1.2, color);
    const topLeft = this.createClones(-strokeW, -strokeW, color);
    const topRight = this.createClones(strokeW, -strokeW, color);
    const right = this.createClones(strokeW, 0, color);
    const bottom = this.createClones(0, strokeW, color);
    const bottomLeft = this.createClones(-strokeW, strokeW, color);
    const bottomRight = this.createClones(strokeW, strokeW, color);
    const left = this.createClones(-strokeW * 1.2, 0, color);

    return (
      <View>
        <View style={stylez.outline}>{left}</View>
        <View style={stylez.outline}>{right}</View>
        <View style={stylez.outline}>{bottom}</View>
        <View style={stylez.outline}>{top}</View>
        <View style={stylez.outline}>{topLeft}</View>
        <View style={stylez.outline}>{topRight}</View>
        <View style={stylez.outline}>{bottomLeft}</View>
        {bottomRight}
      </View>
    );
  }
}
const stylez = StyleSheet.create({
  outline: {
    position: 'absolute',
  },
});
