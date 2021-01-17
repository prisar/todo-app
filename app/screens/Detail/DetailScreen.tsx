import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
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
// import Modal from 'react-native-modalbox';

import {Todo} from '../../store/todo/model';
import {selectCurrentTodo, selectTodos} from '../../store/todo/selectors';
import {removeTodo} from '../../store/todo/actions';
import Separator from '../../components/Separator';
import Button from '../../components/Button';

const {width, height} = Dimensions.get('window');

const DetailScreen = ({navigation}) => {
  const todo: Todo | undefined = selectCurrentTodo();
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [image, setImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
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

  const deleteTodo = () => {
    if (todo) dispatch(removeTodo(todo));
    setModalVisible(false);
    navigation.navigate('Home');
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.todoBox}>
          <TextInput style={styles.title}>{todo?.title}</TextInput>
          <TextInput style={styles.description} multiline>
            {todo?.description}
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
            <Text style={styles.label}>Completetion</Text>
            <CheckBox
              disabled={false}
              value={todo?.complete}
              // onValueChange={setSelection}
              style={styles.checkbox}></CheckBox>
            {/* <Text>{todo?.complete ? 'Complete' : 'Not Complete'}</Text> */}
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
              />
            </TouchableOpacity>
          </View>
          <View>
            <Text>Delete</Text>
            <TouchableOpacity onPress={showConirmation}>
              <Icon name="trash" size={imageIconSize} />
            </TouchableOpacity>
          </View>
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
              style={{...styles.modalText, fontSize: 24, fontWeight: '600'}}>
              Do you want to delete?
            </Text>
            <TouchableOpacity onPress={deleteTodo}>
              <Button label="Delete" onPress={() => {}} />
            </TouchableOpacity>
            <View style={{marginBottom: 50}}></View>
          </View>
        </View>
      </Modal>
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
  },
  todoDoneBox: {
    fontSize: 18,
    borderBottomColor: '#E8E8E8',
    borderBottomWidth: 1,
    width: '90%',
    marginLeft: 20,
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
    marginEnd: 20,
    marginBottom: 20,
    marginLeft: 20,
    width: '50%',
  },
  checkbox: {
    marginLeft: 20,
    alignSelf: 'flex-start',
  },
  imageBox: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 10,
  },
  image: {
    height: 100,
    width: 100,
    marginRight: 20,
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
});

export default DetailScreen;
