import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

function Menu(props) {

    const renderMenuItem = ({item, index}) => {
        return(
            <ListItem 
                key={index}
                title={item.name}
                subtitle={item.description}
                hideChevron={true} // hide right arrow in the list
                onPress={() => props.onPress(item.id)} //item.id will be passed as a parameter
                leftAvatar={{ source: require('./images/vadonut.png')}}
            />
        );
    }

    return(
        <FlatList 
            data={props.dishes}
            renderItem={renderMenuItem} // rendering list items in React Native way
            keyExtractor= {item => item.id.toString()} // Expects a string
        /> 
    );
}

export default Menu;