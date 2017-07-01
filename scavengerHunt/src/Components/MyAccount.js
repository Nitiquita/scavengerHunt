import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Button, Image, Picker } from 'react-native'
import store from '../../store'
import {logout} from '../reducers/authReducer'



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7CAC9'
  },
  points: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
  
});

export default class MyAccount extends Component {
  constructor(props) {
      super(props)
      this.state = store.getState();
      this.logoutAndNavigate = this.logoutAndNavigate.bind(this)
  }

  componentDidMount () {
      this.unsubscribe = store.subscribe(() => {
        this.setState(store.getState());
      });
      
    }

  componentWillUnmount () {
      this.unsubscribe();
    }

    logoutAndNavigate(){
      store.dispatch(logout());
      this.props.navigation.navigate('SignInSignUp');
    }


  render() {
    console.log("in my account state", this.state);
    const userId = (this.state ? this.state.auth.userId : null)//{auth: {userId}} = this.state || {}
     console.log("in my account userId", userId);

     
      return (
        <View style={styles.container}>
        {userId ?
        <View>
          
           
						<Text style={styles.points}>
            
						user name: {this.state.myAccount.userPersonalInfo.username + '\n'}
            email:     {this.state.myAccount.userPersonalInfo.email + '\n'}
            score:    {this.state.myAccount.userPersonalInfo.score + '\n'} 
						</Text>
            <Picker selectedValue={this.state.myAccount.maps[0]}>
            </Picker>
            <Button onPress={() => {this.logoutAndNavigate()}} title="Logout"/>
        
				  </View>

          :
          <View>
          <Text style={styles.points}>you are not logged in </Text>
          <Button onPress={() => {this.props.navigation.navigate('SignInSignUp')}} title="Go To Login"/>

          </View>
      }
      </View>

      
          
          
        
      )
    
    
      

  }
}

// = this.state.authReducer.userId;
//AppRegistry.registerComponent('scavengerHunt', () => MyAccountScreen);







