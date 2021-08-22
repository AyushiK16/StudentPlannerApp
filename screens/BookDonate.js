import React from 'react';
import {View, Image, TouchableOpacity, Text, TextInput, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView, FlatList} from 'react-native';
import db from '../config';
import {ListItem} from 'react-native-elements'
import MyHeader from '../components/MyHeader'
import {Avatar, Icon} from 'react-native-elements'
import firebase from 'firebase';

export default class BookDonate extends React.Component{
  constructor(){
    super();
    this.state = {
      requestedBookList : [],
      userId : firebase.auth().currentUser.email,
    }
  }

  getBookList = () => {
    db.collection('SyllabusAdds').where('userId', '==', this.state.userId).where('syllabusStatus', '==', 'Upcoming')
    .onSnapshot((data)=>{
      var bookList = data.docs.map(doc => doc.data())
      //console.log("HERE " + bookList)
      this.setState({
        requestedBookList : bookList
      })
      console.log("function:" + this.state.requestedBookList)

      //whenever want to put it in a flatlist, use map()
    })
  }

  componentDidMount(){
    this.getBookList();
    console.log("This is the list:" + this.state.requestedBookList)
  }

  keyExtractor = (item, index) => index.toString()
  renderItem = ({item,i}) => {
    return (
      
      <ListItem key={i} bottomDivider>
        <ListItem.Content style = {{backgroundColor: '#81B7B1'}}>
          
          <ListItem.Title style = {{fontSize: 22, fontWeight: 'bold'}}>{item.bookName}</ListItem.Title>
          <ListItem.Subtitle>{item.reason}</ListItem.Subtitle>
          <View>
            <TouchableOpacity style = {styles.button}
            onPress = {()=>{
              this.props.navigation.navigate('RecieverDetails', {'details' : item})
            }}
          >
            <Text>View</Text>
            </TouchableOpacity>
          </View>
        </ListItem.Content>
      </ListItem>
    )
  }
    render(){
        return(
          <View style = {{flex : 1, backgroundColor: '#81B7B1'}}>
            <MyHeader
            title = 'Syllabus'
            navigation = {this.props.navigation}
            />
            <FlatList
            keyExtractor = {this.keyExtractor}
            data = {this.state.requestedBookList}
            renderItem = {this.renderItem}>

            </FlatList>

          
            


          </View>
        )
    }
}

const styles = StyleSheet.create({
    subContainer:{
      flex:1,
      fontSize: 20,
      justifyContent:'center',
      alignItems:'center'
    },
    button:{
      width:100,
      height:30,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:"#32867D",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8
       }
    }
  })