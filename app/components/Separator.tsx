import React from 'react';
import {StyleSheet, View} from 'react-native';

export default () => {
  return <View style={styles.separator}></View>;
};

const styles = StyleSheet.create({
  separator: {
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
  },
});
