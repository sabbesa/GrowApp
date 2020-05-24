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
      name: '',
      category: '',
      keywords: [],
    },
    currentKeyword: null,
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

  setCurrentKeyword = (text) => {
    this.setState(prevState => ({
      currentKeyword: prevState.currentKeyword = text
    }));
  }

  submitKeywords = () => {
    let keyword = this.state.currentKeyword;

    if (keyword && keyword.length > 2) {
      this.setState(prevState => ({
        task: { ...prevState.task, keywords: [...prevState.task.keywords, keyword] },
      }))
    }
  }

  render() {
    return (
      <TaskForm
        setKeywords={this.setCurrentKeyword}
        submitKeywords={this.submitKeywords}
        task={this.state.task}
        onTaskAdded={this.props.route.params.taskAddedCallback}
        onTaskUpdated={this.onTaskUpdated}
      />
    );
  }
}
