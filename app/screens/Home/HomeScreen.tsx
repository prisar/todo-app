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
import moment from 'moment';
import LottieView from 'lottie-react-native';

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
      {!todos.length && (
        <>
          <Text>All caught up</Text>
          <LottieView
            source={require('../../assets/empty-state.json')}
            autoPlay
            loop={true}
            style={styles.emptyAnimation}
          />
        </>
      )}
      <FlatList
        data={todos}
        ItemSeparatorComponent={Separator}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => handleTodoPress(item)}>
            <Image
              source={{
                uri:
                  item.image ||
                  'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
              }}
              style={styles.image}
            />
            <View style={{flex: 1}}>
              <Text style={styles.todoTitle}>{item.title}</Text>
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
  emptyAnimation: {
    alignSelf: 'center',
    width: 250,
  },
  todoTitle: {
    fontSize: 20,
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 20,
  },
});

export default HomeScreen;
