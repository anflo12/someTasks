import React, {Component} from 'react';
import {View} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ListTasks from '../components/ListTasks';
export default class TasksScreen extends Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <ListTasks />
      </View>
    );
  }
}
