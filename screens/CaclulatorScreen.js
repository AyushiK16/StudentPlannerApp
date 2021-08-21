import React from 'react';
import {View, TouchableOpacity, Text, TextInput, StyleSheet, Alert, Modal, ScrollView, KeyboardAvoidingView, Touchable} from 'react-native';
import db from '../config';
//import SantaAnimation from '../components/Santa.js';
import firebase from 'firebase';
import  MyHeader  from '../components/MyHeader';
import { RFValue } from 'react-native-responsive-fontsize'

export default class CalculatorScreen extends React.Component{
    constructor(){
        super();
        this.state = {
            maths: 0,
            firstLang: 0,
            secondLang: 0,
            thirdLang: 0,
            science: 0,
            sst: 0,
            ict: 0,
            marks: 0,
            noOfSubjects: 0,
            totalMarks: 0,
            no1 : 0,
            no2: 0,
            no3 : 0,
            no4: 0,
            no5 : 0,
            no6: 0,
            no7: 0,
            outOf: 0

        }
    }

    calculateMarks(){

        
        var totalMarks = parseInt(this.state.maths) + parseInt(this.state.science) + parseInt(this.state.sst) + parseInt(this.state.firstLang) + parseInt(this.state.secondLang) + parseInt(this.state.thirdLang) + parseInt(this.state.ict)
        var totalSubjects = parseInt(this.state.no1) + parseInt(this.state.no2) + parseInt(this.state.no3) + parseInt(this.state.no4) + parseInt(this.state.no5) + parseInt(this.state.no6) + parseInt(this.state.no7)
        var finalP = parseInt(totalMarks)/(parseInt(totalSubjects)*parseInt(this.state.outOf))*100

        this.setState({
            totalMarks: finalP
        })


        console.log('total marks', totalMarks)
        console.log('subejc', totalSubjects)
        console.log('finalP,', finalP)


    }

    render(){
        return(
            <ScrollView>
                <KeyboardAvoidingView>
          <View style={{ flex: 0.5 }}>
            <View style={{ flex: 0.12 }}>
              <MyHeader title="Marks Caclulator" navigation={this.props.navigation} />
            </View>
    
    
            <View style={styles.formContainer}>
                <View
                  style={{
                    flex: 0.66,
                    padding: RFValue(10),
                  }}
                >

                <Text style={styles.label}>Total Possible Marks for Each Subject </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={"Maximum Marks"}
                    maxLength={10}
                    keyboardType={"numeric"}
                    onChangeText={(text) => {
                      this.setState({
                        outOf: text,
                      });
                    }}
                    //value={this.state.contact}
                  />   
                <Text style={styles.label}>Maths </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={"Maths Marks"}
                    maxLength={12}
                    keyboardType='numeric'
                    onChangeText={(text) => {
                      this.setState({
                        maths: text,
                        no1 : 1
                      });
                    }}
                    //value={this.state.firstName}
                  />
    
                <Text style={styles.label}>Science </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={"Science Marks"}
                    maxLength={12}
                    keyboardType='numeric'
                    onChangeText={(text) => {
                      this.setState({
                        science: text,
                        no2 : 1
                      });
                    }}
                    //value={this.state.lastName}
                  />
    
                    <Text style={styles.label}>SST </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={"SST Marks"}
                    maxLength={10}
                    keyboardType={"numeric"}
                    onChangeText={(text) => {
                      this.setState({
                        sst: text,
                        no3: 1
                      });
                    }}
                    //value={this.state.contact}
                  />

                    <Text style={styles.label}>ICT </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={"ICT Marks"}
                    maxLength={10}
                    keyboardType={"numeric"}
                    onChangeText={(text) => {
                      this.setState({
                        ict: text,
                        no4 : 1
                      });
                    }}
                    //value={this.state.contact}
                  />     

                  <Text style={styles.label}>Language 1 </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={"First Language Marks"}
                    maxLength={10}
                    keyboardType={"numeric"}
                    onChangeText={(text) => {
                      this.setState({
                        firstLang: text,
                        no5: 1
                      });
                    }}
                    //value={this.state.contact}
                  />     

                  <Text style={styles.label}>Language 2 </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={"Second Language Marks"}
                    maxLength={10}
                    keyboardType={"numeric"}
                    onChangeText={(text) => {
                      this.setState({
                        secondLang: text,
                        no6 : 1
                      });
                    }}
                    //value={this.state.contact}
                  />    

                  <Text style={styles.label}>Language 3 </Text>
                  <TextInput
                    style={styles.formTextInput}
                    placeholder={"Third Language Marks"}
                    maxLength={10}
                    keyboardType={"numeric"}
                    onChangeText={(text) => {
                      this.setState({
                        thirdLang: text,
                        no7 : 1
                      });
                    }}
                    //value={this.state.contact}
                  />  

     
    
                    
                </View>
                  <View style={styles.buttonView}>
                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        this.calculateMarks();
                        this.calculateMarks();
                      }}
                    >
                      <Text style={styles.buttonText}>Calculate %</Text>
                    </TouchableOpacity>

                    <Text style = {styles.label2}> Total Marks = {this.state.totalMarks}% </Text>

                    
                </View>
              </View>
          </View>
          </KeyboardAvoidingView>
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
      label2:{
        fontSize:RFValue(18),
        color:"#717D7E",
        fontWeight:'bold',
        marginTop: 10,
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
        marginTop: RFValue(20),
      },
      buttonView:{
        flex: 0.22,
        
        alignItems: "center",
        marginTop:RFValue(18)
    },
      buttonText: {
        fontSize: RFValue(23),
        fontWeight: "bold",
        color: "#fff",
      },
    });