import AsyncStorage from '@react-native-community/async-storage';
import React, {Component} from 'react';
import {FlatList, RefreshControl, TouchableOpacity, View} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalAdd from '../components/ModalAdd';
import TaskItems from '../components/TaskItems';
import DeleteTasks from './DeleteTasks';

export default class ListTasks extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Data: [],
      refresh: false,
      visible: false,
      refreshing: false,
    };
  }
  getData = async () => {
    /* 
    funcion encargada de traer las tareas desde asyncStorage y asignarla al flatlist
    */
    try {
      const value = await AsyncStorage.getItem('Tasks');
      let valueJson = JSON.parse(value);
      this.setState({Data: valueJson});
    } catch (e) {
      // error reading value
    }
  };
  _onRefresh() {
    /* 
    funcion encargada de recargar el flatlist al deslizar hacia abajo y soltar
    */
    this.setState({refreshing: true});
    this.getData().then(() => {
      this.setState({refreshing: false});
    });
  }
  componentDidMount() {
    this.getData();
  }

  onpressView(item) {
    this.props.navigation.navigate('ViewTask', {item: item});
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList
          numColumns={2} // set number of columns
          columnWrapperStyle={{
            flex: 1,
          }} // space them out evenly
          data={this.state.Data}
          extraData={this.state.visible}
          renderItem={({item, index}) =>
            this.state.refresh ? (
              <DeleteTasks isChecked={true} item={item} index={index} />
            ) : (
              <TouchableOpacity
                style={{height: 'auto'}}
                onPress={() => this.onpressView(item)}
                onLongPress={() => this.setState({refresh: true})}>
                <TaskItems item={item} index={index} />
              </TouchableOpacity>
            )
          }
          keyExtractor={(item, index) => index + ''}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh.bind(this)}
            />
          }
        />

        <ActionButton buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Nueva Tarea"
            onPress={() => {
              this.props.navigation.navigate('CreateTask');
            }}>
            <Icon size={20} name="md-create" />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Eliminar tareas"
            onPress={() => {}}>
            <Icon size={20} name="md-trash" />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#1abc9c"
            title="Marcar completadas"
            onPress={() => {}}>
            <Icon size={20} name="md-done-all" />
          </ActionButton.Item>
        </ActionButton>
       
      </View>
    );
  }
}
