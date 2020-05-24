import React, { Component } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  Image
} from 'react-native';
import { Divider, Icon } from 'react-native-elements';
import { deleteTask } from '../taskapi/TasksApi'

class TaskDetailScreen extends Component {

  static navigationOptions = () => {
    return {
      title: 'Task Details'
    }
  };

  render() {
    const task = this.props.route.params.task;

    const onTaskDeleted = this.props.route.params.taskDeletedCallback;

    console.log(task);
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Icon
            reverse
            name='ios-create'
            type='ionicon'
            onPress={() =>
              this.props.navigation.navigate('TaskForm', {
                task: task
              })
            }
          />
          <Icon
            reverse
            name='ios-trash'
            type='ionicon'
            color='#CA300E'
            onPress={() =>
              Alert.alert(
                'Delete?',
                'Cannot be undone',
                [
                  { text: 'Cancel' },
                  { text: 'OK', onPress: () => { deleteTask(task, onTaskDeleted) } }
                ],
                { cancelable: false },
              )
            }
          />
        </View>
        <Image style={styles.image} source={task.image && { uri: task.image }} />
        <Text style={styles.headerText}>{task.name}</Text>
        <Text style={styles.categoryText}>Category: {task.category}</Text>

        <Text style={styles.ingredientText}>Keywords: </Text>
        {
          task.keywords === undefined || task.keywords.length == 0 ?
            <Text>None</Text> : <FlatList
          horizontal={true}
            data={task.keywords}
            contentContainerStyle={styles.listContainer}
              ItemSeparatorComponent={() =>
                <Divider style={{ backgroundColor: 'black' }} />}
              scrollEnabled={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) =>
                <Text style={styles.ingredientItemText}>{item}</Text>
              }
            />
        }
      </View >
    );
  }
}

const styles = StyleSheet.create({
  headerText: {
    fontSize: 32,
    marginBottom: 32,
    color: 'black'
  },
  image: {
    width: '100%',
    aspectRatio: 2,
    marginBottom: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 16,
    marginBottom: 16,
    paddingLeft: 16,
    paddingRight: 16
  },
  categoryText: {
    fontSize: 20,
    marginBottom: 32,
    color: 'black'
  },
  ingredientText: {
    fontStyle: 'italic',
    fontSize: 18,
    marginBottom: 32,
    color: 'black'
  },
  ingredientItemText: {
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 16,
    marginTop: 16,
    color:'black',
    padding: 20
  },
  container: {
    alignItems: 'center',
    backgroundColor:'#d9f7e6'
  },
  listContainer: {
    borderWidth: 0.5,
    width: 200,
    borderColor: 'grey',


  }
});

export default TaskDetailScreen;
