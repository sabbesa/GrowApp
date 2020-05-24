import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
} from 'react-native';
import { getTasks, signout, userId } from '../taskapi/TasksApi';
import { ListItem, Divider } from 'react-native-elements';
import ActionButton from 'react-native-action-button';

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
    selectedIndex: 0
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
  }

  showActionButton = () =>
    <ActionButton
      buttonColor="#b0dec4"
      onPress={() => this.props.navigation.navigate('TaskForm', { taskAddedCallback: this.onTaskAdded })}
    />

  render() {
    return this.state.taskList.length > 0 ?

      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.state.taskList}
          ItemSeparatorComponent={() => <Divider style={{ backgroundColor: 'black' }} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <ListItem
                containerStyle={styles.listItem}
                title={item.name}
                subtitle={`Category: ${item.category}`}
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
      </SafeAreaView> :


      <View style={styles.textContainer}>
        <Text style={styles.emptyTitle}>No Tasks found</Text>
        <Text style={styles.emptySubtitle}>Add a new task using the + button below</Text>
        {this.showActionButton()}
      </View>

  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#f0fbf7'
  },
  listItem: {
    marginTop: 8,
    marginBottom: 8
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 30
  },
  subtitleStyle: {
    fontSize: 18
  },
  emptyTitle: {
    fontSize: 32,
    marginBottom: 16
  },
  emptySubtitle: {
    fontSize: 18,
    fontStyle: 'italic'
  }
});

export default TaskList;
