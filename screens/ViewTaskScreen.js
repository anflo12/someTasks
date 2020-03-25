import React from 'react';
import {View, Dimensions} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
} from 'native-base';

const ViewTask = ({route, navigation}) => {
  const {item} = route.params;
  let height = Dimensions.get('window').height;
  return (
    <Content style={{flex: 1}}>
      <Card style={{height: height}}>
        <CardItem header bordered style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center'}}>
            {item.title}
          </Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text style={{fontSize: 25}}>{item.content}</Text>
          </Body>
        </CardItem>
      </Card>
    </Content>
  );
};

export default ViewTask;
