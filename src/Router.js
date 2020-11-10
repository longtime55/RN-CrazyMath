import React from 'react';
import { StackNavigator } from 'react-navigation';
import Welcome from './screens/Welcome';
import PlayScreen from './screens/PlayScreen';
import End from './screens/End';

export const HomeStack = StackNavigator({
    Welcome: {screen: Welcome, navigationOptions: { header: null }},
    PlayScreen: {screen: PlayScreen, navigationOptions: { header: null }},
    End: {screen: End, navigationOptions: { header: null }},
});