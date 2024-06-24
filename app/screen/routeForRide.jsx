import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Feather } from '@expo/vector-icons';

const RouteForRide = () => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Icon name="location-on" size={20} color="#65696D" />
        <Text style={styles.text}>A S Rao Nagar</Text>
        <Feather name="navigation" size={18} color="#1E88E5" />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>|</Text>
      </View>
      <View style={styles.row}>
        <Icon name="location-on" size={20} color="#65696D" />
        <Text style={styles.text}>Sainik Puri</Text>
        <Feather name="navigation" size={18} color="#1E88E5" />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>|</Text>
      </View>
      <View style={styles.row}>
        <Icon name="location-on" size={20} color="#65696D" />
        <Text style={styles.text}>A S Rao Nagar</Text>
        <Feather name="navigation" size={18} color="#1E88E5" />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>|</Text>
      </View>
      <View style={styles.row}>
        <Icon name="location-on" size={20} color="#65696D" />
        <Text style={styles.text}>Vayupuri</Text>
        <Feather name="navigation" size={18} color="#1E88E5" />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>|</Text>
      </View>
      <View style={styles.row}>
        <Icon name="location-on" size={20} color="#65696D" />
        <Text style={styles.text}>Neredmet</Text>
        <Feather name="navigation" size={18} color="#1E88E5" />
      </View>
      <View style={styles.row}>
        <Text style={styles.text}>|</Text>
      </View>
      <View style={styles.row}>
        <Feather name="navigation" size={18} color="#1E88E5" />
        <Text style={styles.text}>Hyd_GoogleGDO_Sar2</Text>
      </View>
      <View style={styles.buttonView}>
        <Pressable onPress={() => { }}>
          <View style={styles.submitButton}>
            <Feather name="navigation" size={18} color="#FFF"/>
            <Text style={styles.buttonText}>Navigate</Text>
          </View>
        </Pressable>
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
    gap: 5
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
    color: 'black',
  },
  buttonView: {
    marginTop: 20,
    gap: 10,
  },
  submitButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    borderRadius: 30,
    paddingVertical: 10,
    backgroundColor: '#1E88E5',
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600',
    width: '80%',
    textAlign: 'center',
    marginHorizontal: 'auto'
  },
});

export default RouteForRide;
