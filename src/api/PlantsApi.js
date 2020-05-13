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

export function updatePlant(plant, updateComplete) {
  plant.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
  console.log("Updating plant in firebase");

  firebase.firestore()
    .collection('Plants')
    .doc(plant.id).set(plant)
    .then(() => updateComplete(plant))
    .catch((error) => console.log(error));
}

export function deletePlant(plant, deleteComplete) {
  console.log(plant);

  firebase.firestore()
    .collection('Plants')
    .doc(plant.id).delete()
    .then(() => deleteComplete())
    .catch((error) => console.log(error));
}

export async function getPlants(plantsRetreived) {

  var plantList = [];

  var snapshot = await firebase.firestore()
    .collection('Plants')
    .orderBy('createdAt')
    .get()

  snapshot.forEach((doc) => {
    const plantItem = doc.data();
    plantItem.id = doc.id;
    plantList.push(plantItem);
  });

  plantsRetreived(plantList);
}

export function uploadPlant(plant, onPlantUploaded, { updating }) {

  if (plant.imageUri) {
    const fileExtension = plant.imageUri.split('.').pop();
    console.log("EXT: " + fileExtension);

    var uuid = uuid4();

    const fileName = `${uuid}.${fileExtension}`;
    console.log(fileName);

    var storageRef = firebase.storage().ref(`plants/images/${fileName}`);

    storageRef.putFile(plant.imageUri)
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

              plant.image = downloadUrl;

              delete plant.imageUri;

              if (updating) {
                console.log("Updating....");
                updatePlant(plant, onPlantUploaded);
              } else {
                console.log("adding...");
                addPlant(plant, onPlantUploaded);
              }
            })
        }
      )
  } else {
    console.log("Skipping image upload");

    delete plant.imageUri;

    if (updating) {
      console.log("Updating....");
      updatePlant(plant, onPlantUploaded);
    } else {
      console.log("adding...");
      addPlant(plant, onPlantUploaded);
    }
  }
}

export function addPlant(plant, addComplete) {
  plant.createdAt = firebase.firestore.FieldValue.serverTimestamp();

  firebase.firestore()
    .collection('Plants')
    .add(plant)
    .then((snapshot) => {
      plant.id = snapshot.id;
      snapshot.set(plant);
    }).then(() => addComplete(plant))
    .catch((error) => console.log(error));
}
