import React, {useState} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native';

import {Todo} from '../../store/todo/model';
import {selectTodos} from '../../store/todo/selectors';

const ProfileScreen = () => {
  const todos: Todo[] = selectTodos();
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.count}>{todos?.length} todos to work on!</Text>
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
  count: {
    fontSize: 32,
  },
});

export default ProfileScreen;
