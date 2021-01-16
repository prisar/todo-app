import React, {useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

const DetailScreen = () => {
  return (
    <>
      <View style={styles.container}>
        <Text>Todo Details</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailScreen;
