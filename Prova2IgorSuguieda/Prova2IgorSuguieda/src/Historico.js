import React from 'react'; 
import { View, Text, StyleSheet,ScrollView } from 'react-native';

const Historico = ({ historicoDePartidas }) => {
  //Caso o historico de partidas passado esteja vazio, e exibida a mensagem 
  if (!historicoDePartidas || historicoDePartidas.length === 0) {
    return (
      <View style={styles.container}> 
        <Text style={styles.texto}>Não há partidas listadas</Text>
      </View>
    );
  }
  //Caso contrario, lista as partidas que foram disputadas com os placares  
  else {
    return (
      <ScrollView>
        <View style={styles.container}>
          {historicoDePartidas.map((partida, index) => (
            <View key={index} style={[styles.partidaContainer, {backgroundColor: partida.setsJogador1 > partida.setsJogador2 ? '#81eb6a' : '#e8414f'}]} >
              <Text style={styles.jogadores}>
                {partida.nomeJogador1} vs {partida.nomeJogador2}
              </Text>
              <Text>Data: {partida.data}</Text>
              <Text>Localizacao: {partida.cidade} - {partida.estado}</Text>
              <Text style={styles.placar}>
                Placar final: {partida.setsJogador1} - {partida.setsJogador2}
              </Text>
              
              <View style={styles.setsContainer}>
                    {partida.pontuacoesJogador1.map((pontosJogador1, indexJog2) => (
                      <Text key={indexJog2} style={styles.setText}>
                        Set {indexJog2 + 1}:  {pontosJogador1} x {partida.pontuacoesJogador2[indexJog2]}
                      </Text>
                    ))}
                  </View>
              </View>
            ))}
        </View>
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  texto:{
    textAlign: 'center',
  },  
  container: {
    flex: 1,
    width: '100%',
    textAlign: 'center',
    justifyContent: 'center',
  },
  partidaContainer: {
    marginBottom: 0,
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    paddingBottom: 10
  },

  jogadores: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  placar: {
    fontSize: 14,
    color: 'black'
  },
  
});

export default Historico;
