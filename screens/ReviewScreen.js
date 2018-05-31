import React, { Component } from 'react';
import { Platform, Text, View } from 'react-native';
import { Button, Icon } from 'react-native-elements';

class ReviewScreen extends Component {
    static navigationOptions = props => {
        const { navigation } = props;
        const { navigate } = navigation;
        return {
            headerTitle: 'Review Jobs',
            headerRight: 
                (<Button title='Settings'
                onPress = { () => navigate('settings') }
                backgroundColor = 'rgba(0,0,0,0)'
                color = 'rgba(0, 122, 125, 1)' 
                /> 
                ),
                style: {
                    marginTop: Platform.OS === 'android' ? 24 : 0    
                }
        };
    }

    render() {
        return (
            <View>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
                <Text>ReviewScreen</Text>
            </View>
        );
    }
}

export default ReviewScreen;