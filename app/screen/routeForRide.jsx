import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RouteForRide = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon name="location-on" size={20} color="#65696D" />
        <Text style={styles.text}>A S Rao Nagar</Text>
        <Icon name="navigation" size={20} color="black" />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>|</Text>
      </View>
      <View style={styles.row}>
        <Icon name="location-on" size={20} color="#65696D" />
        <Text style={styles.text}>Sainik Puri</Text>
        <Icon name="navigation" size={20} color="blue" />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>|</Text>
      </View>
      <View style={styles.row}>
        <Icon name="location-on" size={20} color="#65696D" />
        <Text style={styles.text}>A S Rao Nagar</Text>
        <Icon name="navigation" size={20} color="blue" />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>|</Text>
      </View>
      <View style={styles.row}>
        <Icon name="location-on" size={20} color="#65696D" />
        <Text style={styles.text}>Vayupuri</Text>
        <Icon name="navigation" size={20} color="blue" />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>|</Text>
      </View>
      <View style={styles.row}>
        <Icon name="location-on" size={20} color="#65696D" />
        <Text style={styles.text}>Neredmet</Text>
        <Icon name="navigation" size={20} color="blue" />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>|</Text>
      </View>
      <View style={styles.row}>
      <Icon name="navigation" size={20} color="white"  border="3px" borderColor="blue"/>
        <Text style={styles.text}>Hyd_GoogleGDO_Sar2</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
});

export default RouteForRide;
