import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack'; 
import AdicionarEsporte from './src/AdicionarEsporte';
import PlacarEsporte from './src/PlacarEsporte';
import Historico from './src/Historico';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();


export default class App extends Component{

  //State armazena o historico de partidas
  state = {
    historicoDePartidas: [],
  };

  //Adiciona a partida finalizada ao histórico
  AddHistorico = (partidaCompleta) => {
    
    console.log('Partida ', partidaCompleta);
    this.setState(
      prevState => ({
        historicoDePartidas: [...prevState.historicoDePartidas, partidaCompleta]
      }),
      () => console.log('Lista partidas:', this.state.historicoDePartidas)
    );

    console.log('Lista partidas', this.state.historicoDePartidas);
  };

  render() {
    return (
      <NavigationContainer>
        <Tab.Navigator screenOptions={{headerStyle: { backgroundColor: '#3498db'}}}>
        <Tab.Screen name="Placar" >
            {() => (
              <Stack.Navigator screenOptions={{headerStyle: { backgroundColor: '#3498db'}}}>
                <Stack.Screen 
                  name="AdicionarEsporte" 
                  component={AdicionarEsporte} 
                 // options={{ headerShown: false }}
                />
                
                <Stack.Screen style ={{flex: 1}}
                  name="Placar" 
                  component={PlacarEsporte} 
                  //options={{ headerShown: false }}
                  initialParams={{ AddHistorico: this.AddHistorico }}
                />
              </Stack.Navigator>
            )}
          </Tab.Screen>
            
          <Tab.Screen name="Historico">
            {() => <Historico historicoDePartidas={this.state.historicoDePartidas} />}
         </Tab.Screen>
        </Tab.Navigator>
      </NavigationContainer>

    );
  }
}

