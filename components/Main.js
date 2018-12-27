import React, { Component } from 'react';
import Home from './Home';
import Menu from './Menu';
import Contact from './Contact';
import { View, Platform } from 'react-native';
import DishDetail from './DishDetails';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';


// Stack Navigator
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

const HomeNavigator = createStackNavigator({
    // Screens
    Home: { screen: Home },
    DishDetail: { screen: DishDetail}
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }

});

const ContactNavigator = createStackNavigator({
    // Screens
    Contact: { screen: Contact}
}, {
    navigationOptions: {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }

});

// Drawer Navigator
const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home'
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu'
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact'
        }
    }

}, {
    drawerBackgroundColor: '#D1C4E9'
});

class Main extends Component {

    render() {
        return(
            <View style={{ flex: 1, paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight }}>
            <MainNavigator />
            </View>
        )

    }
}

export default Main;