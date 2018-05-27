import { AsyncStorage } from 'react-native';
import {
    FACEBOOK_LOGIN_SUCCESS
} from './types';

export const facebooklogin = () => async dispatch => {
    let token = await AsyncStorage.getItem('fb_token');
    if (token) {
        //Dispatch action as FB login done

    } else {
        //Start up FB login process
    }
}; 