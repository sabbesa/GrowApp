import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem, ListView } from 'native-base'

import * as firebase from 'firebase';
import Fire from '../../Fire';

const firebaseConfig = {
  apiKey: 'AIzaSyBEeoHsxw6BJjs8GWATC138qGsL9hG9yFE',
  authDomain: 'grow-app-7dd1d.firebaseapp.com',
  databaseURL: 'https://grow-app-7dd1d.firebaseio.com',
  projectId: 'grow-app-7dd1d',
  storageBucket: 'grow-app-7dd1d.appspot.com',
  messagingSenderId: '321152383674',
  appId: '1:321152383674:ios:5b4f5878381dfbf83ba083',
  measurementId: 'G-F2LBX31CE5'
};

var data = []

export default class App extends React.Component {

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      listViewData: data,
      newToDo: ""
    }

  }

  componentDidMount() {

    var that = this

    firebase.database().ref('/toDo').on('child_added', function (data) {

      var newData = [...that.state.listViewData]
      newData.push(data)
      that.setState({ listViewData: newData })

    })

  }

  addRow(data) {

    var key = firebase.database().ref('/toDos').push().key
    firebase.database().ref('/toDos').child(key).set({ name: data })
  }

  async deleteRow(secId, rowId, rowMap, data) {

    await firebase.database().ref('toDos/' + data.key).set(null)

    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData });

  }

  showInformation() {

  }

  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ marginTop: StatusBar.currentHeight }}>
          <Content>
            <Item>
              <Input
                onChangeText={(newToDo) => this.setState({ newToDo })}
                placeholder="Add task"
              />
              <Button onPress={() => this.addRow(this.state.newToDo)}>
                <Icon name="add" />
              </Button>
            </Item>
          </Content>
        </Header>

        <Content>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem>
                <Text> {data.val().name}</Text>
              </ListItem>
            }
            renderLeftHiddenRow={data =>
              <Button full onPress={() => this.addRow(data)} >
                <Icon name="information-circle" />
              </Button>
            }
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full danger onPress={() => this.deleteRow(secId, rowId, rowMap, data)}>
                <Icon name="trash" />
              </Button>

            }

            leftOpenValue={-75}
            rightOpenValue={-75}

          />

        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',

  },
});
