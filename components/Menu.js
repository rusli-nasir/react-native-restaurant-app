import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { Tile } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseURL } from '../shared/baseURL';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
    }
}


class Menu extends Component {

    // To customize each navigator for each component
    static navigationOptions = {
        title: 'Menu'
    }

    render() {
        const renderMenuItem = ({item, index}) => {
            return(
                <Tile 
                    key={index}
                    title={item.name}
                    caption={item.description}
                    featured
                    onPress={() => navigate('DishDetail', { dishId: item.id })} //item.id will be passed as a parameter
                    imageSrc={{ uri: baseURL + item.image }}
                />
            );
        }

        // Navigator supports passing parameters
        const { navigate } = this.props.navigation;

        return(
            <FlatList 
                data={this.props.dishes.dishes}
                renderItem={renderMenuItem} // rendering list items in React Native way
                keyExtractor= {item => item.id.toString()} // Expects a string
            /> 
        );
    }
 
}

export default connect(mapStateToProps)(Menu);