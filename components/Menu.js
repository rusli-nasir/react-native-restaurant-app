import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';
import { DISHES } from '../shared/dishes';


class Menu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dishes: DISHES
        };
    }

    // To customize each navigator for each component
    static navigationOptions = {
        title: 'Menu'
    }

    render() {
        const renderMenuItem = ({item, index}) => {
            return(
                <ListItem 
                    key={index}
                    title={item.name}
                    subtitle={item.description}
                    hideChevron={true} // hide right arrow in the list
                    onPress={() => navigate('DishDetail', { dishId: item.id })} //item.id will be passed as a parameter
                    leftAvatar={{ source: require('./images/vadonut.png')}}
                />
            );
        }

        // Navigator supports passing parameters
        const { navigate } = this.props.navigation;

        return(
            <FlatList 
                data={this.state.dishes}
                renderItem={renderMenuItem} // rendering list items in React Native way
                keyExtractor= {item => item.id.toString()} // Expects a string
            /> 
        );
    }
 
}

export default Menu;