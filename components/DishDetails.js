import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Rating , Input} from 'react-native-elements';
import { connect } from 'react-redux';
import { baseURL } from '../shared/baseURL';
import { postFavorite } from '../redux/ActionCreators';
import { Directions } from 'react-native-gesture-handler';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
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
                <View style={styles.icons}>
                <Icon 
                    raised  /* Looks like a rounded button  */
                    reverse
                    name={ props.favorite ? 'heart' : 'heart-o' }
                    type='font-awesome'
                    color='#f50'
                    onPress={() => props.favorite ? console.log('Already favorite') : props.onPress()}
                    />
                <Icon
                    raised
                    reverse
                    name='pencil'
                    type='font-awesome'
                    color='purple'
                    onPress={() => props.makeComment()}
                    />
                </View>
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
            <View key={index} style={{margin: 10}}>
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
    constructor(props) {
        super(props);
        this.state = {
            isShownModal: false,
            rating: 1,
            author: '',
            comment: '',
        }
    }

    toggleModal() {
        this.setState({ isShownModal: !this.state.isShownModal })
    }

    markFavorite(dishId) {
        this.props.postFavorite(dishId)
    }

    static navigationOptions = {
        title: 'Dish Details'
    };

    
    render() {
        /* console.log(this.state.rating) */
        /* console.log("Author: ", this.state.author)
        console.log("Commnet: ", this.state.comment) */
        // get the paramater from navigator
        const dishId = this.props.navigation.getParam('dishId', '')
        // + will return the string into a number
        return(
            <ScrollView>
                <RenderDish dish={this.props.dishes.dishes[+dishId]} 
                    favorite={this.props.favorites.some(el => el === dishId)} /* Returns true or false */
                    onPress={() => this.markFavorite(dishId)}
                    makeComment={() => this.toggleModal()}
                    />
                <RenderComments comments={this.props.comments.comments.filter((comment) => comment.dishId === dishId)} />
                <Modal
                animationType={'slide'}
                transparent={false}
                visible={this.state.isShownModal}
                onDismiss={() => this.toggleModal() }
                onRequestClose={() => this.toggleModal()}
                >
                <View>
                    <Rating
                        showRating
                        type='star'
                        fractions={1}
                        startingValue={1}
                        imageSize={42}
                        style={{paddingHorizontal: 10}}
                        onFinishRating={(value) => this.setState({ rating: value})}
                        />
                     <Input 
                        placeholder='Author'
                        leftIcon={{ type: 'font-awesome', name: 'user-o'}}
                        onChangeText={(value) => this.setState({author: value})}
                        />
                    <Input 
                        placeholder='Comment'
                        leftIcon={{type: 'font-awesome', name: 'comment-o'}}
                        onChangeText={(value) => this.setState({comment: value})}
                        />
                    <Button
                        title='SUBMIT'
                        color='#512DA8'
                        onPress={() => this.toggleModal()}
                        accessibilityLabel='Submit Comment'
                        />
                    <Button
                        title='CANCEL'
                        color='#2b2f32'
                        onPress={() => this.toggleModal()}
                        accessibilityLabel='Cancel'
                        />

                </View>
               
            </Modal>
            </ScrollView>
            )
    }

}

const styles = StyleSheet.create({
    icons: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);