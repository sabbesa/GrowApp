import firebase from '@react-native-firebase/app';
import '@react-native-firebase/firestore';
import '@react-native-firebase/storage';
import uuid4 from 'uuid/v4';


export function login({ email, password }) {
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((value) => console.log(value))
}

export function signup({ email, password, displayName }) {
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userInfo) => {
      console.log(userInfo)
      userInfo.user.updateProfile({ displayName: displayName.trim() })
        .then(() => { })
        //.then(() => {
      //  return this.props.firebase.doSendEmailVerification();
    //  })
    })
}

export function subscribeToAuthChanges(authStateChanged) {
  firebase.auth().onAuthStateChanged((user) => {
    authStateChanged(user);
  })
}

export function signout(onSignedOut) {
  firebase.auth().signOut()
    .then(() => {
      onSignedOut();
    })
}

export function handleReset(navigation) {
    this.props.navigation.navigate('Reset');
}

export function updateTask(task, updateComplete) {
  task.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  console.log("Updating task in firebase");

  firebase.firestore()
    .collection('Tasks')
    .doc(task.id).set(task)
    .then(() => updateComplete(task))
    .catch((error) => console.log(error));
}

export function deleteTask(task, deleteComplete) {
  console.log(task);

  firebase.firestore()
    .collection('Tasks')
    .doc(task.id).delete()
    .then(() => deleteComplete())
    .catch((error) => console.log(error));
}


export async function getTasks(tasksRetreived) {

  const userId = firebase.auth().currentUser.uid;

  var taskList = [];

  var snapshot = await firebase.firestore()
    .collection('Tasks')
    .where("userid" , "==" , userId)
    //.orderBy('createdAt')
    .get()

  snapshot.forEach((doc) => {
    const taskItem = doc.data();
    taskItem.id = doc.id;
    taskList.push(taskItem);

  });

  tasksRetreived(taskList);
}

export function uploadTask(task, onTaskUploaded, { updating }) {

  if (task.imageUri) {
    const fileExtension = task.imageUri.split('.').pop();
    console.log("EXT: " + fileExtension);

    var uuid = uuid4();

    const fileName = `${uuid}.${fileExtension}`;
    console.log(fileName);

    var storageRef = firebase.storage().ref(`tasks/images/${fileName}`);

    storageRef.putFile(task.imageUri)
      .on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        snapshot => {
          console.log("snapshot: " + snapshot.state);
          console.log("progress: " + (snapshot.bytesTransferred / snapshot.totalBytes) * 100);

          if (snapshot.state === firebase.storage.TaskState.SUCCESS) {
            console.log("Success");
          }
        },
        error => {
          unsubscribe();
          console.log("image upload error: " + error.toString());
        },
        () => {
          storageRef.getDownloadURL()
            .then((downloadUrl) => {
              console.log("File available at: " + downloadUrl);

              task.image = downloadUrl;

              delete task.imageUri;

              if (updating) {
                console.log("Updating....");
                updateTask(task, onTaskUploaded);
              } else {
                console.log("adding...");
                addTask(task, onTaskUploaded);
              }
            })
        }
      )
  } else {
    console.log("Skipping image upload");

    delete task.imageUri;

    if (updating) {
      console.log("Updating....");
      updateTask(task, onTaskUploaded);
    } else {
      console.log("adding...");
      addTask(task, onTaskUploaded);
    }
  }
}

export function addTask(task, addComplete) {
  task.createdAt = firebase.firestore.FieldValue.serverTimestamp();
  const userId = firebase.auth().currentUser.uid;

  firebase.firestore()
    .collection('Tasks')
    .add(task)
    .then((snapshot) => {
      task.userid = userId;
      task.id = snapshot.id;
      snapshot.set(task);
    }).then(() => addComplete(task))
    .catch((error) => console.log(error));
}
