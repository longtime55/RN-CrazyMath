/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  AsyncStorage,
  TimerMixin,
  TouchableHighlight,
  BackHandler,
} from 'react-native';

var isTrue, isPlus, num1, num2, result, calc, timer;
var TIME = 5;

export default class PlayScreen extends Component {
  constructor(props) {
    TIME = 5;
    super(props)
    this.state = {
      score: 0,
      bestScore: 0,
      time: TIME,
      isGameOver: false
    }
    this._getBestScore();
    this._renderQuestion();
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  render() {
    return (
      <View style={styles.container}>

        <View style={styles.panlelTop}>
          <View style={styles.bestScore}>
            <Text style={styles.scoreText}>
              BEST: {this.state.bestScore}
            </Text>
          </View>
          <View style={styles.yourscore}>
            <Text style={styles.scoreText}>
              SCORE: {this.state.score}
            </Text>
          </View>
        </View>
        <View style={styles.panelTime}>
          <Text style={styles.txtTime}>{this.state.time}</Text>
        </View>
        <View style={styles.panelCenter}>
          <Text style={styles.calculate}>{calc}</Text>
        </View>
        <View style={styles.panelBottom}>
          <View style={styles.buttonFalse}>
            <TouchableHighlight style={styles.imageButtonFalse} onPress={this._checkButtonFalse}>
              <Image
                style={styles.imageButton}
                source={require('./../res/lose.png')}
              />
            </TouchableHighlight>
          </View>
          <View style={styles.buttonTrue}>
            <TouchableHighlight style={styles.imageButtonTrue} onPress={this._checkButtonTrue}>
              <Image
                style={styles.imageButton}
                source={require('./../res/tick.png')}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
  _getBestScore() {
    AsyncStorage.getItem("BEST_SCORE").then((value) => {
      this.setState({
        bestScore: (value == null ? 0 : value)
      });
    }).done();
  }

  _clearTimer() {
    clearInterval(timer);
    this.setState({ time: TIME });
  }

  _checkButtonTrue = () => {
    this._clearTimer();
    if (isTrue) {
      let newScore = this.state.score + 1;
      if (TIME > 2 && newScore % 10 == 0) TIME--;
      console.log(this.state.score);
      this.setState({
        score: newScore
      });
      this._renderQuestion();
    } else if (this.state.isGameOver == false) {
      this.setState({ isGameOver: true });
      this._gameOver();
    }
  }

  _checkButtonFalse = () => {
    this._clearTimer();
    if (!isTrue) {
      let newScore = this.state.score + 1;
      if (TIME > 2 && newScore % 10 == 0) TIME--;
      console.log(this.state.score);
      this.setState({
        score: newScore
      });
      this._renderQuestion();
    } else if (this.state.isGameOver == false) {
      this.setState({ isGameOver: true });
      this._gameOver();
    }
  }

  _renderQuestion() {
    num1 = this._randomBetween(1, 5);
    num2 = this._randomBetween(1, 5);
    isTrue = Math.random() >= 0.5 ? true : false;
    isPlus = Math.random() >= 0.5 ? true : false;
    result = num1;
    if (isPlus) result += num2;
    else result -= num2;
    if (!isTrue) {
      if (result % 2 == 0) result -= 1;
      else result += 1;
    }
    calc = num1 + (isPlus ? ' + ' : ' - ') + num2 + ' = ' + result;

    time = TIME;
    timer = setInterval(() => {
      time--;
      this.setState({ time: time });
      console.log('time: ' + time);
      if (time == 0) {
        if (this.state.isGameOver == false) {
          this.setState({ isGameOver: true });
          this._gameOver();
        }
      }
    }, 1000);
  }

  _gameOver() {
      this._clearTimer();
      this.state.bestScore = this.state.score > this.state.bestScore ? this.state.score : this.state.bestScore;
      AsyncStorage.setItem("BEST_SCORE", this.state.bestScore.toString());
      this.props.navigation.navigate('End', { BEST_SCORE: this.state.bestScore, YOUR_SCORE: this.state.score })
  }

  _randomBetween(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 25,
    color: '#fff'
  },
  panelTime: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  panelCenter: {
    flex: 6,
    justifyContent: 'center',
    alignItems: 'center'
  },
  calculate: {
    fontSize: 60,
    color: '#5BBD2B',
    fontWeight: 'bold'
  },
  panelBottom: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingBottom: 90,
  },
  buttonTrue: {
    flex: 1,
    alignItems: 'center',
    marginRight: 10,
    marginLeft: 7,
  },
  buttonFalse: {
    flex: 1,
    alignItems: 'center',
    marginRight: 7,
    marginLeft: 10,
  },
  imageButtonTrue: {
    backgroundColor: '#23ed04',
    padding: 30,
  },
  imageButtonFalse: {
    backgroundColor: '#f40602',
    padding: 30,
  },
  imageButton: {
      //flex: 1,
  },
  txtTime: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold'
  }
});

