import Expo, { Notifications } from 'expo';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';
import { Provider } from 'react-redux';

import registerForNotifications from './services/push_notifications';
import store from './store';
import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';

export default class App extends React.Component {
  componentDidMount() {
    registerForNotifications();
    Notifications.addListener((notification) => {
      const { data: { text }, origin } = notification;

      if (origin === 'received' && text ) {
        Alert.alert(
          'New Push Notification',
          text,
          [{ text: 'OK' }]
        );
      }
    });
  }
  
  render() {
    const MainNavigator = createBottomTabNavigator({
      welcome: WelcomeScreen,
      auth: AuthScreen,
      main: {
        screen: createBottomTabNavigator({
          map: { screen: MapScreen },
          deck: { screen: DeckScreen },
          review: { screen: ReviewScreen },
        }, {
          tabBarPosition: 'bottom',
          tabBarOptions: {
            labelStyle: { 
              fontSize: 12
            }
          }
        }) 
      } 
    }, {
      navigationOptions: {
        tabBarVisible: false
      },
      lazy: true
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
