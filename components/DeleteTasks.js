import {Body, Card, CardItem, Text, View} from 'native-base';
import React, {Component} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-material-ui';
import CheckBox from 'react-native-check-box';
let task = [];
export default class DeleteTasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isChecked: false,
    };
  }

  saveSelected(tasks, indexc) {
    /**  esta funcion se encarga de activar el check y agregar el item al array
     *  si se desactiva el check se borrara del array
     *
     */
    if (!this.state.isChecked) {
      this.setState({
        isChecked: true,
      });
      task.push({
        title: tasks.title,
        content: tasks.content,
      });
      console.log(task);
    } else if (this.state.isChecked) {
      this.setState({
        isChecked: false,
      });

      console.log('index', indexc);
      if (indexc >= 0) {
        task.splice(indexc, 1);
        console.log('nuevo', task);
      }
    }
  }
  render() {
    let width = Dimensions.get('window').width / 2.1;

    // este componente permite  selecionar el item a eliminar por medio de un checkbox
    // traigo de react-native checkbox

    let tasks = this.props.item;
    let index = this.props.index;
    return (
      <Card style={{width: width}}>
        <CardItem header bordered>
          <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
            {tasks.title}
          </Text>

          <CheckBox
            style={{flex: 1, alignItems: 'flex-end'}}
            checkedCheckBoxColor="blue"
            onClick={() => this.saveSelected(tasks, index)}
            isChecked={this.state.isChecked}
          />
        </CardItem>
        <CardItem>
          <Body>
            <Text>{tasks.content}</Text>
          </Body>
        </CardItem>
      </Card>
    );
  }
}
