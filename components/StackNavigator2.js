import {createStackNavigator} from 'react-navigation-stack'
import BookDonate from '../screens/BookDonate';
import DetailsScreen from '../screens/DetailsScreen';
import BookRequest from '../screens/BookRequest';
import AddReminders from '../screens/AddReminders';
import AddScreen from '../screens/AddScreen';

export const StackNavigator2 = createStackNavigator({
    Add: { screen : AddScreen,
    navigationOptions : {headerShown : false}},

    SyllabusAdd : {screen : BookRequest,
        navigationOptions : {headerShown : false}},
    
    ReminderAdd : {screen : AddReminders,
        navigationOptions : {headerShown : false}}
},

{intialRouteName : 'Add'}

)


