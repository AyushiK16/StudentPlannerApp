import React from 'react';
import {View, Image, TouchableOpacity, Text, TextInput, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import db from '../config';
import {ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import {Avatar, Icon} from 'react-native-elements'
import {RFValue} from 'react-native-responsive-fontsize'


export default class AddScreen extends React.Component{
  constructor(){
    super();
    this.state = {
      toBeAdded : ''
    }
  }
  render(){
    return(
      //<View>
        <View style = {{flex : 1, backgroundColor: '#81B7B1'}}>
        <MyHeader title = "Add"
                    navigation = {this.props.navigation}/>

          <View style = {styles.keyBoardStyle}>
          <Text style = {{fontWeight: 'bold', fontSize: 20, alignItems: 'center'}}> What do you want to add?</Text>

            <TouchableOpacity style = {styles.button}
              onPress ={()=>{
                this.props.navigation.navigate("SyllabusAdd");
                console.log('PRESSED')

              }}>
                <Text> Add a Syllabus</Text>
               </TouchableOpacity>

              <TouchableOpacity style = {styles.button}
              onPress ={()=>{
                this.props.navigation.navigate('ReminderAdd')
                }}>
                  <Text> Add a Reminder</Text>
                </TouchableOpacity>
                </View>
          </View>
      //</View>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: "75%",
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
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  keyBoardStyle: {
    flex: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
});