import React, {useEffect} from 'react';
import {
  FlatList,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {useDispatch} from 'react-redux';
import CheckBox from '@react-native-community/checkbox';
import moment from 'moment';

import Separator from '../../components/Separator';
import TodoService from '../../services/TodoService';
import {loadTodos, setCurrentTodo} from '../../store/todo/actions';
import {Todo} from '../../store/todo/model';
import {selectTodos} from '../../store/todo/selectors';

const HomeScreen = ({navigation}: any) => {
  const todos: Todo[] = selectTodos();
  const dispatch = useDispatch();

  useEffect(() => {
    TodoService.getTodos()
      .then((todos: Todo[]) => {
        dispatch(loadTodos(todos));
      })
      .catch((error) => {
        console.error('Error loading todos', error);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleTodoPress = (todo: Todo) => {
    dispatch(setCurrentTodo(todo));
    navigation.navigate('Detail');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.listTitle}>Todos</Text>
      <FlatList
        data={todos}
        ItemSeparatorComponent={Separator}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleTodoPress(item)}>
            {/* <CheckBox
              disabled={true}
              value={item.complete}
              onValueChange={setSelection}
              style={styles.checkbox}></CheckBox> */}
            <Image
              source={{
                uri:
                  item.image ||
                  'https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/indian_man_male_person-512.png',
              }}
              style={{height: 100, width: 100, marginRight: 20}}
            />
            <View style={{flex: 1}}>
              <Text>{item.title}</Text>
              <Text style={{borderTopWidth: 0.5}}>
                {moment(item.dateDue).fromNow()}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item, index) => index.toString()}
        style={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    paddingVertical: 25,
    paddingHorizontal: 25,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 3,
    elevation: 1,
    margin: 5,
  },
  list: {
    width: '90%',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkbox: {
    // alignSelf: 'center',
    margin: 5,
  },
  listTitle: {
    elevation: 1,
    opacity: 0.9,
    height: '10%',
    fontSize: 32,
    fontFamily: 'sans-serif',
    color: '#1654f0',
    alignSelf: 'flex-start',
    margin: 20,
  },
});

export default HomeScreen;
