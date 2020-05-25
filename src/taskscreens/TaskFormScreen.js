import React, { Component } from 'react';
import TaskForm from '../taskui/TaskForm';
import firebase from '@react-native-firebase/app';

export default class TaskFormScreen extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('task') ? 'Edit Task' : 'New Task'
    }
  };

  state = {
    task: {
      title: '',
      date: '',
      descriptions: [],
    },
    currentDescription: null,
  }

  componentDidMount() {
    const currentTask = this.props.route.params.task;

    if (currentTask) {
      this.setState(prevState => ({ task: prevState.task = currentTask }))
    }
  }

  onTaskUpdated = (task) => {
    console.log(task);
    this.props.navigation.popToTop();
  }

  setCurrentDescription = (text) => {
    this.setState(prevState => ({
      currentDescription: prevState.currentDescription = text
    }));
  }

  submitDescriptions = () => {
    let description = this.state.currentDescription;

    if (description && description.length > 2) {
      this.setState(prevState => ({
        task: { ...prevState.task, descriptions: [...prevState.task.descriptions, description] },
      }))
    }
  }

  render() {
    return (
      <TaskForm
        setDescriptions={this.setCurrentDescription}
        submitDescriptions={this.submitDescriptions}
        task={this.state.task}
        onTaskAdded={this.props.route.params.taskAddedCallback}
        onTaskUpdated={this.onTaskUpdated}
      />
    );
  }
}
