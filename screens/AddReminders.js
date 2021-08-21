import React from 'react';
import {View, TouchableOpacity, Text, TextInput, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView, Touchable, FlatList, Image} from 'react-native';
import db from '../config';
//import SantaAnimation from '../components/Santa.js';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'
import {BookSearch} from 'react-native-google-books'
import {RFValue} from 'react-native-responsive-fontsize'

export default class AddReminders extends React.Component{
    constructor(){
        super();
        this.state = {
            userId : firebase.auth().currentUser.email,
            bookName : '',
            reason : '',
            isBookRequestActive : false,
            userDocId : '',
            docId : '',
            requestedSyllabusName : '',
            requestedSyllabusStatus : '',
            requestId : '',
            dataSource : '',
            showFlatlist : false,
            requestedImageLink : '#',
            toBeAdded: null,
            randomRequestId : ''

        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7)
    }

    addRequest = async(bookName, reason) => {
        var userId = this.state.userId
        var randomRequestId = this.createUniqueId();
        this.setState({randomRequestId : randomRequestId})
        //var book = await BookSearch.searchbook(bookName, 'AIzaSyCLhVw_1amugkXzdsccCJbXahi7yb4vrgQ')
        db.collection('ReminderAdds').add({
            //notificationStatus : 'unread',
            userId : userId,
            reminderDate : bookName,
            notificationStatus : 0,
            hello : 'hello',
            details : reason,
            requestId : randomRequestId,
            //syllabusStatus : 'Upcoming',
            date : firebase.firestore.FieldValue.serverTimestamp(),

            
            //imageLink : book.data[0].volumeInfo.imageLinks.smallThumbnail
        })

        
        //await this.getBookRequest()
        console.log("after line 40", this.state.userId)
        /*
        db.collection('Users').where('emailId', '==', this.state.userId)
        .get().then((data)=>{
            data.forEach((doc)=>{
                console.log("line 43")
                db.collection('Users').doc(doc.id)
                .update({isBookRequestActive : true})
            })
        })
        */
        this.setState({
            bookName : '',
            reason : '',
            requestId : randomRequestId
        })
        Alert.alert("Reminder added successfully")
    }



    /*
    getBookRequest(){
        db.collection('SyllabusAdds').where('userId', '==', this.state.userId)
        .get()
        .then((data)=>{
            data.forEach((doc)=>{
                if(doc.data().syllabusStatus !== 'Completed'){
                    this.setState({
                        requestId : doc.data().requestId,
                        requestedSyllabusName : doc.data().bookName,
                        requestedSyllabusStatus : doc.data().syllabusStatus,
                        docId : doc.id,
                        //requestedImageLink : doc.data().imageLink
                    })
                }
            })
        })
    }    
    */

    /*
    getIsBookRequestActive(){
        db.collection('Users').where('emailId', '==', this.state.userId)
        .onSnapshot((snap)=>{
            snap.forEach((doc)=>{
                this.setState({
                    isBookRequestActive : doc.data().isBookRequestActive,
                    userDocId : doc.id
                })
            })
        })
    }
*/


    /*
    updateSyllabusStatus(){
        db.collection('SyllabusAdds').doc(this.state.docId).update({
            syllabusStatus : 'Recieved'
        })
        db.collection('Users').doc(this.state.userDocId)
        .update({ isBookRequestActive : false})
    }
*/
    sendNotification(){
        db.collection('Users').where('emailId', '==', this.state.userId)
        .get().then((data)=>{
            data.forEach((doc)=>{
                var name = doc.data().firstName
                var lastName = doc.data().lastName
                db.collection('ReminderAdds').where('requestId', '==', this.state.requestId)
                .get().then((snap)=>{
                    snap.forEach((doc)=>{
                        var donarId = doc.data().donarId
                        var bookName = doc.data().bookName
                        db.collection('ReminderAdds').add({
                            targetedUserId : donarId,
                            //message : name + ' ' + lastName + ' recieved the book ' + bookName,
                            notificationStatus : 'unread',
                            reminderDate : bookName
                        })
                    })
                })
            })
        })
    }

    getBooksFromAPI = async(bookName) => {
        this.setState({
            bookName : bookName
        })
        if(bookName.length > 2){
            //var book = await BookSearch.searchbook(bookName, 'AIzaSyCLhVw_1amugkXzdsccCJbXahi7yb4vrgQ')
            this.setState({
                dataSource : book.data,
                showFlatlist : true
            })
        }
    }

    renderItem = ({item,i}) => {
        return(
            <TouchableOpacity
            style = {{alignItems : 'center', backgroundColor : '#DDDDDD', padding : 10, width : "90%"}}
            onPress = {()=>{
                this.setState({
                    bookName : item.volumeInfo.title,
                    showFlatlist : false
                })
            }}
            bottomDivider
            >

            </TouchableOpacity>
        )
    }

    componentDidMount = async() => {
        //this.getBookRequest()
        //this.getIsBookRequestActive()

    }
    render(){
            return(
                
                <View style = {{flex : 1, backgroundColor: '#81B7B1'}}>
                    <MyHeader title = "Add Reminder"
                    navigation = {this.props.navigation}/>
                    <KeyboardAvoidingView style = {styles.keyBoardStyle}>
                    <Text style = {{fontWeight: 'bold', fontSize: 20}}> 
                        Enter your reminders here!</Text>

                        <TextInput style = {styles.formTextInput}
                        placeholder = "Enter reminder date"
                        onChangeText = {(text)=>{
                            this.getBooksFromAPI(text)
                            
                        }}
                        value = {this.state.bookName}/>
                    {this.state.showFlatlist?
                    (
                        <FlatList
                        data =  {this.state.dataSource}
                        renderItem = {this.renderItem}
                        style = {{ marginTop: 10 }}
                        keyExtractor = {(item,index)=>{
                            return index.toString()
                        }}
                        />
                    ): 
                    (
                        
                        <View style = {{alignItems : 'center'}}>
                            

                        <TextInput style = {styles.formTextInput2}
                        placeholder = "Enter reminder details"
                        multiline 
                        //numberOfLines = {8}
                        onChangeText = {(text)=>{
                            this.setState({
                                reason : text
                            })
                            
                        }}
                        value = {this.state.reason}/>
    
                        <TouchableOpacity style = {styles.button}
                        onPress = {()=>{
                            this.addRequest(this.state.bookName, this.state.reason)
                        }}>
                            <Text style = {{fontSize : 20}}>Add</Text>
    
                        </TouchableOpacity>

                        </View>
                        
                    )}
                    

    
    
                    </KeyboardAvoidingView>
                </View>
            )
          
    }
    /*
    render(){
            return(
                <View style = {{flex : 1}}>
                    <MyHeader title = "Add Syllabus"
                    navigation = {this.props.navigation}/>
                (

                    <KeyboardAvoidingView style = {styles.keyBoardStyle}>
                    <TextInput style = {styles.formTextInput}
                    placeholder = "Enter subject name"
                    value = {this.state.bookName}/>
                    </KeyboardAvoidingView>

                ):
                (
                <FlatList
                    data =  {this.state.dataSource}
                    renderItem = {this.renderItem}
                    style = {{ marginTop: 10 }}
                    keyExtractor = {(item,index)=>{
                        return index.toString()
                    }}
                    />
                )
                (
                <View style = {{alignItems : 'center'}}>
                    <TextInput style = {styles.formTextInput}
                        placeholder = "Enter details"
                        multiline 
                        numberOfLines = {20}
                        onChangeText = {(text)=>{
                            this.setState({
                                reason : text
                            })
                            
                        }}
                        value = {this.state.reason}/>
    
                    <TouchableOpacity style = {styles.button}
                        onPress = {()=>{
                            this.addRequest(this.state.bookName, this.state.reason)
                        }}>
                            <Text>Add</Text>
    
                    </TouchableOpacity>

                        </View>
                        
                )
                
                
                </View>
            )
        }
        }    
    //}*/
    }


const styles = StyleSheet.create({
    keyBoardStyle: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
    formTextInput: {
      width: "75%",
      height: RFValue(35),
      borderWidth: 1,
      padding: 10,
      marginTop : 100
    },
    formTextInput2: {
        width: 350,
        height: RFValue(175),
        borderWidth: 1,
        padding: 10,
        marginTop : 50,
      },
    ImageView:{
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center",
      marginTop:20
    },
    imageStyle:{
      height: RFValue(150),
      width: RFValue(150),
      alignSelf: "center",
      borderWidth: 5,
      borderRadius: RFValue(10),
    },
    bookstatus:{
      flex: 0.4,
      alignItems: "center",
  
    },
    requestedSyllabusName:{
      fontSize: RFValue(30),
      fontWeight: "500",
      padding: RFValue(10),
      fontWeight: "bold",
      alignItems:'center',
      marginLeft:RFValue(60)
    },
    status:{
      fontSize: RFValue(20),
      marginTop: RFValue(30),
    },
    syllabusStatus:{
      fontSize: RFValue(30),
      fontWeight: "bold",
      marginTop: RFValue(10),
    },
    buttonView:{
      flex: 0.2,
      justifyContent: "center",
      alignItems: "center",
    },
    buttontxt:{
      fontSize: RFValue(18),
      fontWeight: "bold",
      color: "#fff",
    },
    touchableopacity:{
      alignItems: "center",
      backgroundColor: "#DDDDDD",
      padding: 10,
      width: "90%",
    },
    requestbuttontxt:{
      fontSize: RFValue(20),
      fontWeight: "bold",
      color: "#fff",
    },
    button: {
      width: 100,
      height: RFValue(60),
      justifyContent: "center",
      alignItems: "center",
      marginTop: 30,
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
    },
  });