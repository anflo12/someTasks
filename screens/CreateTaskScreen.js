import AsyncStorage from '@react-native-community/async-storage';
import {Button, Card, Content, Text, View} from 'native-base';
import React from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import TextInput from 'react-native-material-textinput';
import Textarea from 'react-native-textarea';

export default class CreateTask extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      name: '',
    };
  }
  onChange = value => {
    this.setState({text: value});
  };

  addTask = async () => {
    /* funcion encargada de agregar lanueva tarea al asyncStorage
       este hace unacopia de los datos que existan y le suma el nuevo item
    */
    const value = await AsyncStorage.getItem('Tasks');
    let valueJson = JSON.parse(value);
    let task;
    if (value == null) {
      task = [];
    } else {
      task = [...valueJson];
    }

    try {
      task.push({
        title: this.state.name,
        content: this.state.text,
      });
      await AsyncStorage.setItem('Tasks', JSON.stringify(task));
      console.log('Task created');
      this.props.navigation.navigate('ListTask');
    } catch (e) {
      // saving error
    }
  };

  onChangeTextName(text) {
    this.setState({name: text});
  }

  render() {
    let height = Dimensions.get('window').height;

    return (
      <Content style={{flex: 1}}>
        <Card style={{height: height}}>
          <KeyboardAwareScrollView>
            <Text style={styles.textTitle}>Crear Nueva Tarea</Text>

            <TextInput
              label="Nombre de  tarea "
              value={this.state.name}
              onChangeText={name => this.setState({name})}
            />
            <View style={styles.container}>
              <Textarea
                containerStyle={styles.textareaContainer}
                style={styles.textarea}
                onChangeText={this.onChange}
                defaultValue={this.state.text}
                maxLength={2000}
                placeholder={'Descripcion de la tarea '}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
              />
            </View>

            <Button style={styles.buttonStyle} onPress={this.addTask} primary>
              <Text style={styles.buttonText}> Agregar Tarea </Text>
            </Button>
          </KeyboardAwareScrollView>
        </Card>
      </Content>
    );
  }
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    justifyContent: 'flex-end',
    margin: 16,
    right: 0,
    backgroundColor: 'blue',
    bottom: 0,
  },
  container: {
    flex: 1,

    marginBottom: 15,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    height: 450,
    padding: 2,
    borderWidth: 1,
    backgroundColor: 'white',
  },
  textarea: {
    textAlignVertical: 'top', // hack android
    height: 170,
    fontSize: 14,
    color: '#333',
  },
  textTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
  },
  buttonStyle: {
    alignSelf: 'center',
    marginBottom: 50,
    width: 200,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    marginLeft: 20,
    fontWeight: 'bold',
  },
});
