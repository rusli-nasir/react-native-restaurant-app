import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import { baseURL } from '../shared/baseURL';
import { postFavorite } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToPRops = dispatch => ({
    postFavorite: (dishId) => dispatch(postFavorite(dishId))
});

function RenderDish(props) {
    const dish = props.dish;

    if(dish != null) {
        return(
            <Card
                featuredTitle={dish.name}
                image={{ uri: baseURL + dish.image }}
            >
                <Text style={{margin: 10}}>
                    {dish.description}
                </Text>
                {/* Favorite button */}
                <Icon 
                    raised  /* Looks like a rounded button  */
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o' }
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
            </Card>
        );
    } else {
        return(<View></View>)
    }
}

function RenderComments(props) {
    const comments = props.comments;

    const renderCommentItem = ({ item, index}) => {
        return(
            <View key={index} stlye={{margin: 10}}>
                <Text style={{fontSize: 14}}>{item.comment}</Text>
                <Text style={{fontSize: 12}}>{item.rating} Stars</Text>
                <Text style={{fontSize: 12}}>{'--' + item.author + ', ' + item.date}</Text>
            </View>
        );
    }

    return(
        <Card title="Comments">
            <FlatList
                data={comments}
                renderItem={renderCommentItem}
                keyExtractor={item => item.id.toString()}
                />
        </Card>
    );  

}

class DishDetail extends Component {

    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    render() {
        // get the paramater from navigator
        const dishId = this.props.navigation.getParam('dishId', '')
        // + will return the string into a number
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)} /* Returns true or false */
                    onPress={() => this.markFavorite(dishId)}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
            </ScrollView>
            )
    }

}

export default connect(mapStateToProps, mapDispatchToPRops)(DishDetail);