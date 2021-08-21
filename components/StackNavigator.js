import {createStackNavigator} from 'react-navigation-stack'
import BookDonate from '../screens/BookDonate';
import DetailsScreen from '../screens/DetailsScreen';
import BookRequest from '../screens/BookRequest';
import AddReminders from '../screens/AddReminders';

export const StackNavigator = createStackNavigator({
    BookDonateList : {screen : BookDonate,
        navigationOptions : {headerShown : false}},
    
    RecieverDetails : {screen : DetailsScreen,
        navigationOptions : {headerShown : false}},

    SyllabusAdd : {screen : BookRequest,
        navigationOptions : {headerShown : false}},
    
    ReminderAdd : {screen : AddReminders,
        navigationOptions : {headerShown : false}}
},

{intialRouteName : 'BookDonateList'}

)


