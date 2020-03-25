/* eslint-disable react/jsx-no-undef */
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import {StyleSheet} from 'react-native';
import 'react-native-gesture-handler';
import ListTasks from './components/ListTasks';
import CreateTask from './screens/CreateTaskScreen';
import ViewTask from './screens/ViewTaskScreen';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ListTask" component={ListTasks} />
        <Stack.Screen name="CreateTask" component={CreateTask} />
        <Stack.Screen name="ViewTask" component={ViewTask} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textareaContainer: {
    height: 200,
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
});
export default App;
