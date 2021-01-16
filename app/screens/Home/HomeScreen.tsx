import React, {memo, useState} from 'react';
import {View, StyleSheet, Text, Button, TouchableOpacity, SafeAreaView} from 'react-native';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addFriend} from '../../actions/FriendsActions';

export function HomeScreen({friends, addFriend}) {
  const addFrnd = (index) => {
    addFriend(index);
  };

  return (
    <>
      <View style={styles.container}>
        <Text>You have {friends.current.length} friends.</Text>

        {friends.possible.map((friend, index) => (
          <Button key={friend} title={`Add ${friend}`} onPress={() => addFrnd(index)} />
        ))}
        <Button title="Add some friends" onPress={() => {}} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => {
  const {friends} = state;
  return {friends};
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      addFriend,
    },
    dispatch,
  );

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
