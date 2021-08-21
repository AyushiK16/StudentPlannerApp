import React from 'react';
import {Image, TouchableOpacity} from 'react-native'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Header, Icon, Badge} from 'react-native-elements'
import BookDonate from '../screens/BookDonate'
import BookRequest from '../screens/BookRequest'
import {StackNavigator} from './StackNavigator'
import AddScreen from '../screens/AddScreen'
import NewModal from '../screens/NewModal'
import AddReminders  from '../screens/AddReminders';
import ReminderScreen from '../screens/ReminderScreen.js'
import { StackNavigator2 } from './StackNavigator2';


export const TabNavigator = createBottomTabNavigator({
    DonateBooks : {
        screen : StackNavigator,
        navigationOptions : {
            tabBarIcon : <Image source = {require ('../assets/request-list.png')}
            style = {{width : 20, height : 20}}/>,

            tabBarLabel : "Syllabus"
        }
    },

    Add : {
        screen : StackNavigator2,
        navigationOptions : {
            tabBarIcon :   
                <Icon
                    type = 'font-awesome'
                    name = 'plus-circle'
                    color = 'teal'
                    size = {60}
                    iconStyle = {{marginBottom : 40}}
                    containerStyle = {{position : "absolute"}}
                    />,
                tabBarLabel : " " 
        }
  
    },
/*
    RequestBooks : {
        screen : AddReminders,
        navigationOptions : {
            tabBarIcon : <Image source = {require ('../assets/request-book.png')}
            style = {{width : 20, height : 20}}/>,
            
            tabBarLabel : "Reminders"
        }
    },
*/
    ReminderScreen : {
        screen : ReminderScreen,
        navigationOptions : {
            tabBarIcon : <Image source = {require ('../assets/request-book.png')}
            style = {{width : 20, height : 20}}/>,
            tabBarLabel : "Reminders"
        }
    }

})

/*

<TouchableOpacity style = {{
                justifyContent: "center",
                alignItems: "center",
                alignSelf : 'center',
                backgroundColor : 'teal',
                borderRadius : 100,
                width : 40,
                height : 40,
                marginBottom : 0 }}>
                              </TouchableOpacity>


*/