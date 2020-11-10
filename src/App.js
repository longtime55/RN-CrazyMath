/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import {HomeStack} from './Router';
export default class App extends Component {
  render (){
    return (
      <HomeStack/>
    )
  }
}