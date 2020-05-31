import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image

} from 'react-native';
import { getTasks, signout, userId } from '../taskapi/TasksApi';
import { ListItem, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';
import BackgroundGreenWhite from '../images/BackgroundGreenWhite.png';
import firebase from '@react-native-firebase/app'

class TaskList extends Component {
  static navigationOptions = ({ navigation }) => {

    onSignedOut = () => {
      navigation.navigate('Auth');
    }

    return {
      title: 'Task List',
      headerRight: (
        <Button
          title='log out'
          onPress={() => signout(onSignedOut)} />
      )
    }
  };

  state = {
    taskList: [],
    selectedIndex: 0,
    currentUser: null
  }

  onTaskAdded = (task) => {
    this.setState(prevState => ({
      taskList: [...prevState.taskList, task]
    }));
    this.props.navigation.popToTop();
  }

  onTaskDeleted = () => {

    var newTaskList = [...this.state.taskList];
    newTaskList.splice(this.state.selectedIndex, 1);

    this.setState(prevState => ({
      taskList: prevState.taskList = newTaskList
    }));

    this.props.navigation.popToTop();
  }

  onTasksReceived = (taskList) => {
    this.setState(prevState => ({
      taskList: prevState.taskList = taskList
    }));
  }

  componentDidMount() {
    getTasks(this.onTasksReceived);
    const { currentUser } = firebase.auth()
    this.setState({ currentUser })
  }

  showActionButton = () =>
    <ActionButton
      buttonColor="white"
      renderIcon={active => (
   <Text style={{ color: "black", fontSize: 55, position: 'relative', bottom:3  }}>+</Text>
 )}
      onPress={() => this.props.navigation.navigate('TaskForm', { taskAddedCallback: this.onTaskAdded })}
    />

  render() {

    const { currentUser } = this.state
    return this.state.taskList.length > 0 ?


      <SafeAreaView style={styles.container}>
          <ImageBackground source={BackgroundGreenWhite} style={styles.backgroundContainer}>
          <View>
          <Text style={styles.HeaderText}>{currentUser && currentUser.displayName}'s Tasks </Text>
          </View>
        <FlatList
          data={this.state.taskList}
          ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (

              <ListItem
                containerStyle={styles.listItem}
                title={item.title}
                subtitle={`Finish date: ${item.date}`}
                titleStyle={styles.titleStyle}
                subtitleStyle={styles.subtitleStyle}
                leftAvatar={{
                  size: 'large',
                  rounded: false,
                  source: item.image && { uri: item.image }
                }}
                onPress={() => {
                  this.setState(prevState => ({ selectedIndex: prevState.selectedIndex = index }))
                  this.props.navigation.navigate('TaskDetail', { task: item, taskDeletedCallback: this.onTaskDeleted })
                }
                }

              />

            );
          }
          }
        />
        {this.showActionButton()}
      </ImageBackground>
      </SafeAreaView>:




      <View style={styles.textContainer}>
      <ImageBackground source={BackgroundGreenWhite} style={styles.backgroundContainer}>
      <View>
      <Text style={styles.HeaderText}>{currentUser && currentUser.displayName}'s Tasks </Text>
      </View>
        <Text style={styles.emptyTitle}>No tasks found</Text>
        <Text style={styles.emptySubtitle}>Add a new task using the + button below</Text>
        {this.showActionButton()}
      </ImageBackground>
      </View>


  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    backgroundColor: 'white',

  },
  backgroundContainer: {
        width: '100%',
        height: '100%',


  },
  listItem: {
    marginTop: 8,
    marginBottom: 8
  },
  HeaderText:{
    marginTop: 100,
    marginLeft: 30,
    fontSize: 30,
    fontWeight: 'bold',
    //fontFamily:'monospace' ,
    color: 'black'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },
  titleStyle: {
    fontSize: 25,
    //fontFamily:'monospace' ,
    color:'black',

  },
  subtitleStyle: {
    fontSize: 15,
    //fontFamily:'monospace' ,
    color: 'black',
    alignItems: 'center'
  },
  emptyTitle: {
    fontSize: 32,
    //fontFamily:'monospace' ,
    color: 'black',
    marginBottom: 16,
    alignSelf: 'center',
    position: 'relative',
    top: 200
  },
  emptySubtitle: {
    fontSize: 18,
    marginLeft: 40,
    //fontFamily:'monospace' ,
    color: 'black',
    fontStyle: 'italic',
    alignItems: 'center',
    position: 'relative',
    top: 230,

  }
});

export default TaskList;
