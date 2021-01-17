import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  // Button,
  Modal,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import LottieView from 'lottie-react-native';

import {Todo} from '../../store/todo/model';
import {selectCurrentTodo, selectTodos} from '../../store/todo/selectors';
import {setCurrentTodo, updateTodo, removeTodo} from '../../store/todo/actions';
import Separator from '../../components/Separator';
import Button from '../../components/Button';

const {width, height} = Dimensions.get('window');

const DetailScreen = ({navigation}) => {
  const todo: Todo | undefined = selectCurrentTodo();
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [complete, setComplete] = useState<boolean | undefined>(undefined);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [image, setImage] = useState<string | undefined>(undefined);
  const [modalVisible, setModalVisible] = useState(false);
  const [showTrashAnimation, setShowTrashAnimation] = useState(false);
  const imageIconSize = 52;
  const dispatch = useDispatch();

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  const showConirmation = () => {
    setModalVisible(true);
  };

  const editTitle = (text) => {
    setTitle(text);
    if (!todo) {
      return;
    }
    const editedTodo = {...todo, title: text};
    if (editTodo) editTodo.title = text;
    dispatch(setCurrentTodo(editedTodo));
    editTodo();
  };

  const editDescription = (text) => {
    setDescription(text);
    if (!todo) {
      return;
    }
    const editedTodo = {...todo, description: text};
    if (editTodo) editTodo.description = text;
    dispatch(setCurrentTodo(editedTodo));
    editTodo();
  };

  const editCompletetion = () => {
    setComplete(!todo?.complete);
    if (!todo) {
      return;
    }
    const editedTodo = {...todo, complete: complete};
    // if (editTodo) editTodo.description = text;
    dispatch(setCurrentTodo(editedTodo));
    editTodo();
  };

  const editTodo = () => {
    if (todo) dispatch(updateTodo(todo));
  };

  const deleteTodo = () => {
    if (todo) dispatch(removeTodo(todo));
    setModalVisible(false);
    setShowTrashAnimation(true);
    setTimeout(function () {
      setShowTrashAnimation(false);
      navigation.navigate('Home');
    }, 3000);
  };

  useEffect(() => {
    setTitle(todo?.title);
    setDescription(todo?.description);
    setImage(todo?.image);
    // setComplete(todo?.complete);
    setDate(todo?.dateDue);
  }, [todo]);

  return (
    <>
      {showTrashAnimation ? (
        <LottieView
          source={require('../../assets/trash.json')}
          autoPlay
          loop={false}
          style={styles.trashAnimation}
        />
      ) : (
        <View style={styles.container}>
          <View style={styles.todoBox}>
            <TextInput
              style={styles.title}
              onChangeText={(text) => editTitle(text)}
              placeholder="title">
              {title}
            </TextInput>
            <TextInput
              style={styles.description}
              onChangeText={(text) => editDescription(text)}
              placeholder="description"
              multiline>
              {description}
            </TextInput>
            <View style={styles.dueDateBox}>
              <Text style={styles.label}>Due Date</Text>
              <View style={styles.todoTime}>
                <TouchableOpacity
                  onPress={showDatepicker}
                  style={styles.datetime}>
                  <Text style={styles.datetimeText}>
                    {date.toLocaleDateString()}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={showTimepicker}
                  style={styles.datetime}>
                  <Text style={styles.datetimeText}>
                    {date.toLocaleTimeString()}
                  </Text>
                </TouchableOpacity>
                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                  />
                )}
              </View>
            </View>
            <View style={styles.todoDoneBox}>
              <Text style={styles.donelabel}>Completetion</Text>
              <CheckBox
                // value={false}
                onValueChange={() => {
                  editCompletetion();
                }}
                style={styles.checkbox}></CheckBox>
            </View>
            <View style={styles.imageBox}>
              <Text style={styles.label}>Image</Text>
              <TouchableOpacity onPress={() => {}}>
                <Image
                  source={{
                    uri:
                      todo?.image ||
                      'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg',
                  }}
                  style={styles.image}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.deleteBox}>
              <Text style={styles.label}>Delete</Text>
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={showConirmation}>
                <Icon name="trash" size={imageIconSize} />
              </TouchableOpacity>
            </View>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TouchableHighlight
                  style={{...styles.closeButton, backgroundColor: '#2196F3'}}
                  onPress={() => {
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.textStyle}>X</Text>
                </TouchableHighlight>
                <Text
                  style={{
                    ...styles.modalText,
                    fontSize: 24,
                    fontWeight: '600',
                  }}>
                  Do you want to delete?
                </Text>
                <TouchableOpacity onPress={deleteTodo}>
                  <Button label="Delete" onPress={() => {}} />
                </TouchableOpacity>
                <View style={{marginBottom: 50}}></View>
              </View>
            </View>
          </Modal>
        </View>
      )}
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
  title: {
    fontSize: 26,
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  description: {
    fontSize: 18,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    width: '90%',
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  dueDateBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  todoDoneBox: {
    fontSize: 18,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    width: '90%',
    marginLeft: 20,
    // marginTop: 10,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  todoBox: {
    borderWidth: 0.5,
    borderRadius: 15,
    height: '90%',
    width: '90%',
    backgroundColor: '#FFFF88',
  },
  label: {
    marginLeft: 20,
    alignSelf: 'flex-start',
    fontSize: 18,
  },
  donelabel: {
    marginLeft: 0,
    marginTop: 20,
    marginBottom: 10,
    alignSelf: 'flex-start',
    fontSize: 18,
  },
  datetime: {
    borderWidth: 1,
    borderRadius: 3,
    height: 40,
    marginLeft: 20,
  },
  datetimeText: {
    fontSize: 18,
    padding: 5,
    alignSelf: 'center',
  },
  todoTime: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginRight: 20,
    alignSelf: 'flex-end',
  },
  checkbox: {
    alignSelf: 'flex-end',
  },
  imageBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
    height: 0.2 * height,
    flex: 1,
  },
  image: {
    width: 0.4 * width,
    marginRight: 20,
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    backgroundColor: '#AAAAAA',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,
    elevation: 5,
    width: 0.99 * width,
    height: 0.3 * height,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    // textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#242822',
    borderRadius: 15,
    width: 30,
    height: 30,
    padding: 5,
    margin: 5,
    elevation: 2,
    alignSelf: 'flex-end',
  },
  deleteButton: {
    borderRadius: 25,
    height: 50,
    width: 0.8 * width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteBox: {
    marginTop: 10,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  deleteIcon: {
    marginTop: 20,
    marginLeft: 20,
    flex: 1,
  },
  trashAnimation: {
    alignSelf: 'center',
    width: 250,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DetailScreen;
