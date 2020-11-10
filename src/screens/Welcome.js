/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  AsyncStorage,
  Text,
  View,
  Image,
  TouchableHighlight,
} from 'react-native';


export default class Welcome extends Component {
  constructor(){
    super()
    this.state = {
      bestScore: 0,
    }
    this._getBestScore();
  }
  _onPressButton=() => {
    this.props.navigation.navigate('PlayScreen')
  }
  render() {
    return (
      <View style={styles.container}>
        
        <View style = {styles.panlelTop}>
          <View style = {styles.bestScore}>
            <Text style = {styles.scoreText}>
              BEST: {this.state.bestScore}
            </Text>
          </View>
          <View style = {styles.yourscore}>
            <Text style = {styles.scoreText}>
              SCORE: 0
            </Text>
          </View>
        </View>
        <View style= {styles.panelText}>
          <Text style = {styles.gameName}>CRAZY MATH</Text>
        </View>
        <View style = {styles.panelCenter}>
          <TouchableHighlight onPress={this._onPressButton} underlayColor = "#37384D">
              <Image
                style={styles.buttonPlay}
                source={require('./../res/play.png')}
              />
          </TouchableHighlight>
        </View>

        <View style = {styles.panelBottom}>
          <Text style={{color: '#fff'}}>Copyright (c) 2017 by Long - Hieu</Text>
        </View>
      </View>

    );
  }
  _getBestScore(){
    AsyncStorage.getItem("BEST_SCORE").then((value) => {
      this.setState({
        bestScore: (value == null ? 0 : value)
      });
      // console.log('welcome: ' + value);
    }).done();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#37384D',
  },
  panlelTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 10
  },
  bestScore: {
    flex: 1,
    alignItems: 'flex-start',
  },
  yourscore: {
    flex: 1,
    alignItems: 'flex-end'
  },
  scoreText: {
    fontSize: 25,
    color: '#fff'
  },
  panelText: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  panelCenter: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonPlay: {
    width: 80,
    height: 80
  },
  panelBottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableHighlightButton: {
    alignItems: 'center',
  },
  gameName: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold'
  }
});
