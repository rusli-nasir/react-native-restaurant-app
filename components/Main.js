import React, { Component } from 'react';
import Home from './Home';
import Menu from './Menu';
import About from './About';
import Contact from './Contact';
import { View, Platform } from 'react-native';
import DishDetail from './DishDetails';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';


// Stack Navigator
const MenuNavigator = createStackNavigator({
    // Screens
    Menu: { screen: Menu,
        navigationOptions: ({ navigation }) => ({
            headerLeft: <Icon name='menu' size={24}
                    color='white'
                    onPress={() => navigation.toggleDrawer()} // provided method by default
                    />
        }) },
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
    navigationOptions:  ({ navigation }) => ( {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })

});

const ContactNavigator = createStackNavigator({
    // Screens
    Contact: { screen: Contact},

}, {
    navigationOptions: ({ navigation }) => ( {
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })

});

const AboutNavigator = createStackNavigator({
    // Screens
    About: { screen: About}
}, {
    navigationOptions:  ({ navigation }) => ({
        headerStyle: {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        },
        headerLeft: <Icon name='menu' size={24}
            color='white'
            onPress={() => navigation.toggleDrawer()}
        />
    })

});

// Drawer Navigator
const MainNavigator = createDrawerNavigator({
    Home: {
        screen: HomeNavigator,
        navigationOptions: {
            title: 'Home',
            drawerLabel: 'Home',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    Menu: {
        screen: MenuNavigator,
        navigationOptions: {
            title: 'Menu',
            drawerLabel: 'Menu',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='list'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            title: 'About',
            drawerLabel: 'About',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='address-card'
                    type='font-awesome'
                    size={22}
                    color={tintColor}
                    />
            )
        }
    },
    Contact: {
        screen: ContactNavigator,
        navigationOptions: {
            title: 'Contact',
            drawerLabel: 'Contact',
            drawerIcon: ({ tintColor }) => (
                <Icon
                    name='home'
                    type='font-awesome'
                    size={24}
                    color={tintColor}
                    />
            )
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