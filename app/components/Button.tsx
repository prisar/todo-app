import React from 'react';
import {Text, StyleSheet, Dimensions} from 'react-native';
import {RectButton} from 'react-native-gesture-handler';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 0.8 * width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    textAlign: 'center',
  },
});

const Button = ({label, onPress}) => {
  const backgroundColor = '#1654f0';
  const color = 'white';
  return (
    <RectButton style={[styles.container, {backgroundColor}]} {...{onPress}}>
      <Text style={[styles.label, {color}]}>{label}</Text>
    </RectButton>
  );
};

export default Button;
