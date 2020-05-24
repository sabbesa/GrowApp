import React from 'react';
import {
StyleSheet,
Text,
FlatList
} from 'react-native';

const GridList = (props) => {
return (
  <>
    <FlatList
      contentContainerStyle={styles.grid}
      horizontal={true}
      data={props.items}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => {
        console.log(item);
        return <Text style={styles.item}>{item}</Text>
      }
      }
    />
  </>
)
}

var styles = StyleSheet.create({
item: {
  backgroundColor: 'lightgrey',
  margin: 5,
  width: 90,
  padding: 8,
  color: 'white'
},
grid: {
  marginBottom: 32,
  marginTop: 16,
  alignItems: 'center'
}
})

export default GridList;
