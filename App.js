import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import firebase from 'react-native-firebase';
const App = () => {
  const [value, setvalue] = useState('');
  useEffect(() => {
    loadData();
  },[])
  async function loadData() {
    firebase
      .database()
      .ref('Name')
      .once('value', data => {
        console.log(data.toJSON());
      });
  }
  async function pushData() {
    firebase
      .database()
      .ref('/Name/003')
      .push({
        name: value,
      })
      .then(() => {
        console.log('Success');
      })
      .catch(err => {
        console.log(err);
      });
  }
  async function updateData() {
    firebase
      .database()
      .ref('/Name/002')
      .update({name: 'Hello'})
      .then(() => {
        console.log('Update success');
      });
  }

  async function deleteData() {
    firebase
      .database()
      .ref('/Name/001')
      .remove()
      .then(() => {
        console.log('remove success');
      });
  }
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.txtinput}
        placeholder="Nhap ten"
        onChangeText={text => setvalue(text)}
      />
      <View style={styles.view}>
        <Button title={'Save'} onPress={pushData} />
      </View>
      <View style={styles.view}>
        <Button title={'Update'} onPress={updateData} />
      </View>
      <View style={styles.view}>
        <Button title={'Remove'} onPress={deleteData} />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 25,
  },
  txtinput: {
    marginVertical: 12,
    fontSize: 18,
  },
  view: {
    marginTop: 20,
    height: 100,
  },
});
export default App;
