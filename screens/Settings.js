import React from 'react';
import {View, TouchableOpacity, Text, TextInput, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView, Touchable} from 'react-native';
import db from '../config';
//import SantaAnimation from '../components/Santa.js';
import firebase from 'firebase';
import  MyHeader  from '../components/MyHeader';
import { RFValue } from 'react-native-responsive-fontsize'

export default class Settings extends React.Component{
    constructor(){
        super();
        this.state = {
            emailId: '',
            firstName:  '',
            address: '',
            contact: '',
            lastName: '',
            docId : ''
        }
    }

    getUserDetails = () => {
        var email = firebase.auth().currentUser.email
        db.collection('Users')
        .where('emailId', '==', email)
        .get()
        .then((data)=>{
            data.forEach((doc)=>{
                var info = doc.data()
                this.setState({
                    firstName : info.firstName,
                    lastName : info.lastName,
                    address : info.address,
                    contact : info.contact,
                    docId : doc.id
                })
            })
        })
    }

    updateUserDetails = () => {
        db.collection('Users').doc(this.state.docId).update({
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            contact : this.state.contact,
            address : this.state.address
        })
    }

    componentDidMount(){
        this.getUserDetails();
    }



    render(){
        return(
          <ScrollView contentContainerStyle={{flexGrow: 1}}
  keyboardShouldPersistTaps='handled'>
          
          <View style={{ flex: 1 }}>
            <View style={{ flex: 0.12 }}>
              <MyHeader title="Settings" navigation={this.props.navigation} />
            </View>
    
    
            <View style={styles.formContainer}>
                <View
                  style={{
                    flex: 0.66,
                    padding: RFValue(10),
                  }}
                >
                <Text style={styles.label}>First Name </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={"First Name"}
                    maxLength={12}
                    onChangeText={(text) => {
                      this.setState({
                        firstName: text,
                      });
                    }}
                    value={this.state.firstName}
                  />
    
                <Text style={styles.label}>Last Name </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={"Last Name"}
                    maxLength={12}
                    onChangeText={(text) => {
                      this.setState({
                        lastName: text,
                      });
                    }}
                    value={this.state.lastName}
                  />
    
                    <Text style={styles.label}>Contact </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={"Contact"}
                    maxLength={10}
                    keyboardType={"numeric"}
                    onChangeText={(text) => {
                      this.setState({
                        contact: text,
                      });
                    }}
                    value={this.state.contact}
                  />
    
                    
                </View>
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        this.updateUserDetails();
                      }}
                    >
                      <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
              </View>
          </View>
          </ScrollView>
        );
      }
    }

    const styles = StyleSheet.create({
      container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor:"#6fc0b8"
      },
      formContainer:{
        flex: 0.88,
        justifyContent:'center'
      },
      label:{
        fontSize:RFValue(18),
        color:"#717D7E",
        fontWeight:'bold',
        padding:RFValue(10),
        marginLeft:RFValue(20)
      },
      formTextInput: {
        width: "90%",
        height: RFValue(50),
        padding: RFValue(10),
        borderWidth:1,
        borderRadius:2,
        borderColor:"grey",
        marginBottom:RFValue(20),
        marginLeft:RFValue(20)
      },
      button: {
        width: "75%",
        height: RFValue(60),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: RFValue(50),
        backgroundColor: "#32867d",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: 0.44,
        shadowRadius: 10.32,
        elevation: 16,
        marginTop: RFValue(10),
      },
      buttonView:{
        flex: 0.22,
        alignItems: "center",
        marginTop:RFValue(100)
    },
      buttonText: {
        fontSize: RFValue(23),
        fontWeight: "bold",
        color: "#fff",
      },
    });