import {Body, Card, CardItem, Text, View} from 'native-base';
import React, {Component} from 'react';
import {Dimensions, TouchableOpacity} from 'react-native';
import {RadioButton} from 'react-native-material-ui';
export default class TaskItems extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selected: false,
    };
  }

  render() {
    let width = Dimensions.get('window').width / 2.1;

    let tasks = this.props.item;
    return (
      <Card style={{width: width}}>
        <CardItem header bordered>
          <Text style={{fontSize: 18, fontWeight: 'bold', textAlign: 'center'}}>
            {tasks.title}
          </Text>
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
