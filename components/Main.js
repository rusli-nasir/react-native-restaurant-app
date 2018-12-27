import React, { Component } from 'react';
import Menu from './Menu';
import { View, Platform } from 'react-native';
import  { DISHES }  from '../shared/dishes';
import DishDetail from './DishDetails';
import { createStackNavigator } from 'react-navigation';


const MenuNavigator = createStackNavigator({
    // Screens
    Menu: { screen: Menu },
    DishDetail: { screen: DishDetail}
}, {
    // Navigation Options
    initialRouteName: 'Menu',
    navigationOptions: { // common configuration to all the screens
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }

});

class Main extends Component {

    render() {
        return(
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MenuNavigator />
            </View>
        )

    }
}

export default Main;