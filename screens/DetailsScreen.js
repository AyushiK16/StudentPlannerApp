import React from 'react';
import {View, TouchableOpacity, Text, TextInput, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView, Image} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import {Card, Header, Icon} from 'react-native-elements'
import {RFValue} from 'react-native-responsive-fontsize'

export default class DetailsScreen extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            userId : firebase.auth().currentUser.email,
            recieverId : this.props.navigation.getParam('details')['userId'],
            requestId : this.props.navigation.getParam('details')['requestId'],
            bookName: this.props.navigation.getParam('details')['bookName'],
            reason: this.props.navigation.getParam('details')['reason'],
            recieverName : '',
            recieverContact: '',
            recieverAddress: '',
            recieverDocId : '',
            userName : '',
            imageLink : '#'
        }

        //console.log('This is the details screen',this.state.bookName)
    }

    getRecieverDetails(){
        db.collection('Users').where('emailId', '==', this.state.recieverId)
        .get()
        .then((info)=>{
            info.forEach((doc)=>{
                this.setState({
                    recieverName : doc.data().firstName,
                    recieverContact : doc.data().contact,
                    recieverAddress : doc.data().address
                })
            })
        })
        db.collection('SyllabusAdds').where('requestId', '==', this.state.requestId)
        .get()
        .then((snapshot)=>{
          snapshot.forEach((doc)=>{
            this.setState({
              imageLink : doc.data().imageLink,
              recieverDocId : doc.id
            })
          })
        })
    }

    

    deleteSyllabus(){
      db.collection('SyllabusAdds').doc(this.state.recieverDocId)
      .update({syllabusStatus: 'Deleted'})
      console.log(this.state.requestId)
    }

    componentDidMount(){
        this.getRecieverDetails();
        this.getUserDetails(this.state.userId)
    }

    addNotification(){
        var message = this.state.userName + ' has shown interest in donating the book.'
        db.collection('Notifications').add({
            targetedUserId : this.state.recieverId,
            donarId : this.state.userId,
            requestId : this.state.requestId,
            bookName : this.state.bookName,
            message : message,
            notificationStatus : 'unread',
            date : firebase.firestore.FieldValue.serverTimestamp()
        })

    }

    getUserDetails(userId){
      db.collection('Users').where("emailId", "==", userId)
      .get().then((snapshot)=>{
        snapshot.forEach((doc)=>{
          this.setState({
            userName : doc.data().firstName + ' ' + doc.data().lastName
          })
        })
      })
    }

    render() {
      return (
        <ScrollView>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 0.1 }}>
            <Header
              leftComponent={
                <Icon
                  name="arrow-left"
                  type="feather"
                  color="#ffffff"
                  onPress={() => this.props.navigation.goBack()}
                />
              }
              centerComponent={{
                text: "Syllabus",
                style: {
                  color: "#ffffff",
                  fontSize: RFValue(20),
                  fontWeight: "bold",
                },
              }}
              backgroundColor="#32867d"
            />
          </View>
          <View style={{ flex: 0.9 }}>
            
            <View
              style={{
                flex: 0.7,
                padding: RFValue(20),
              }}
            >
              <View style={{ flex: 0.7 ,justifyContent:'center',alignItems:'center',marginTop:RFValue(50),borderWidth:1,borderColor:'#deeedd',padding:RFValue(10)}}>
                <Text
                  style={{
                    fontWeight: "500",
                    fontSize: RFValue(30),
                  }}
                >
                  {this.state.bookName} Syllabus
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: RFValue(20),
                    marginTop: RFValue(30),
                  }}
                >
                  Topics/Chapters:
                </Text>
                <Text
                  style={{
                    fontWeight: "400",
                    fontSize: RFValue(20),
                    marginTop: RFValue(30),
                  }}
                >
                {this.state.reason}
                </Text>
                
              </View>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                      //this.updateBookStatus();
                      //this.addNotification();
                      this.props.navigation.navigate("BookDonateList");
                      //DELETE THE SYLLABUS OR REMOVE IT FROM THE 
                      this.deleteSyllabus()
                    }}
                  >
                    <Text>Delete Syllabus</Text>
                  </TouchableOpacity>
                
              </View>
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
    },
    buttonContainer: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center",
    },
    button: {
      width: "50%",
      height: RFValue(40),
      justifyContent: "center",
      marginTop: 150,
      alignItems: "center",
      borderRadius: RFValue(50),
      backgroundColor: "#f78e77",
      shadowColor: "#000000",
      shadowOffset: {
        width: 0,
        height: 8,
      },
      elevation: 16,
    },
  });