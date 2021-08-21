import React from 'react';
import {View, Image, TouchableOpacity, Text, TextInput, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import db from '../config';
import {ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import {RFValue} from 'react-native-responsive-fontsize'
import firebase from 'firebase'
import {Avatar, Icon} from 'react-native-elements'

export default class LogoutScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      toBeAdded : ''
    }
  }
  render(){
    return(
        <View style = {{backgroundColor: '#81B7B1'}}>
            <MyHeader
            title = 'Logout'
            navigation = {this.props.navigation}
            />

            <Text style = {styles.textStyle}>
                Do you wish to logout? 
            </Text>

            <Text style = {styles.textStyle2}>
            Press the following button:
            </Text>
        <View style = {{marginTop: 120}}>
        <TouchableOpacity style = {styles.button}
        onPress = {()=>{
            this.props.navigation.navigate('WelcomeScreen')
            firebase.auth().signOut()
        }}>

          <Icon
          name = 'logout'
          type = 'antdesign'
          size = {RFValue(20)}
          iconStyle = {{alignItems: 'center'}}

          />
            <Text style = {{fontSize : RFValue(15), fontWeight : 'bold', alignSelf: 'center'}}> Logout </Text>
        </TouchableOpacity>

    </View>

    <Text>       </Text>
    <Text>       </Text>
    <Text>       </Text>
    <Text>       </Text>
    <Text>       </Text>
    <Text>       </Text>
    <Text>       </Text>
    <Text>       </Text>
    <Text>       </Text>
    <Text>       </Text>
    <Text>       </Text>
    <Text>       </Text>
    <Text>       </Text>
    <Text>       </Text>
    <Text>       </Text>

    </View>
    )
  }
}

const styles = StyleSheet.create({
button: {
    width: "50%",
    height: RFValue(60),
    justifyContent: "center",
    alignItems: "center",
    alignSelf: 'center',
    borderRadius: RFValue(50),
    marginTop: 100,
    backgroundColor: "#32867d",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 8,
    }},
  keyBoardStyle: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  logOutContainer: {
    flex: 0.2,
    justifyContent: "flex-end",
    //paddingBottom: 30,
    marginBottom: 20,
  },
  logOutButton: {
    height: 30,
    width: "100%",
    justifyContent: "center",
    padding: 10,
  },
  textStyle : {
    fontWeight: 'bold', 
    fontSize: 20, 
    alignItems: 'center', 
    marginTop: 150, 
    alignSelf: 'center'
  },
  textStyle2 : {
    fontWeight: 'bold', 
    fontSize: 20, 
    alignItems: 'center', 
    marginTop: 5, 
    alignSelf: 'center'
  }
  
});

/*

*/