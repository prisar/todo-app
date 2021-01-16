import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LottieView from 'lottie-react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import {addTodo} from '../../store/todo/actions';
import {Todo} from '../../store/todo/model';
import Button from '../../components/Button';

export function AddTodoScreen({navigation}: any) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showDoneAnimation, setShowDoneAnimation] = useState(false);
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [image, setImage] = useState('');

  const dispatch = useDispatch();
  const imageIconSize = 52;

  const addNewTodo = () => {
    setShowDoneAnimation(true);
    const newTodo: Todo = {
      id: Math.floor(Math.random() * 1000000 + 1),
      title: title,
      description: description,
      image: image,
      complete: false,
      dateDue: date,
    };
    console.log('new todo', newTodo);
    dispatch(addTodo(newTodo));
    setTimeout(function () {
      setShowDoneAnimation(false);
      navigation.navigate('Home');
    }, 3000);
  };

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

  const pickImage = () => {
    try {
      const options = {
        title: 'Select Photo',
        allowsEditing: true,
        storageOptions: {
          skipBackup: true,
          path: 'images',
        },
      };
      ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          console.log('User tapped custom button: ', response.customButton);
        } else {
          const source = {uri: response.uri};

          setImage(source.toString());
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <View style={styles.container}>
        {showDoneAnimation ? (
          <LottieView
            source={require('../../assets/8878-done.json')}
            autoPlay
            loop={false}
            style={styles.doneAnimation}
          />
        ) : (
          <>
            <TextInput
              value={title}
              onChangeText={(text) => setTitle(text)}
              placeholder="Add title"
              style={styles.title}
            />
            <TextInput
              value={description}
              onChangeText={(text) => setDescription(text)}
              placeholder="Add description"
              style={styles.description}
              multiline
            />
            <Text style={styles.label}>Image</Text>
            <TouchableOpacity style={styles.imageIcon} onPress={pickImage}>
              <Icon name="image" size={imageIconSize} />
            </TouchableOpacity>
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
            </View>
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
            <Button label="Add" onPress={addNewTodo} />
          </>
        )}
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
  title: {
    width: '90%',
    borderWidth: 1,
    margin: 5,
    borderRadius: 3,
  },
  description: {
    width: '90%',
    height: '20%',
    borderWidth: 1,
    borderRadius: 3,
    margin: 5,
    textAlignVertical: 'top',
  },
  doneAnimation: {
    alignSelf: 'center',
    width: 250,
  },
  label: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 20,
  },
  datetime: {
    borderWidth: 1,
    borderRadius: 3,
    height: 40,
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
    width: '50%',
  },
  imageIcon: {
    alignSelf: 'flex-start',
    marginLeft: 20,
    marginBottom: 20,
  },
});

export default AddTodoScreen;
