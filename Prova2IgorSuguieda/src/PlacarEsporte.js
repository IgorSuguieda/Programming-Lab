import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Dimensions, KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Location from 'expo-location';
export default function PlacarEsporte({ route, navigation, AddHistorico }) {
  // Parâmetros recebidos da tela AdicionarEsporte
  const { 
    pontosVencerSet, 
    nroDeSets, 
    nomeJogador1, 
    nomeJogador2 
  } = route.params;

  //States do placar
  const [currentSet, setCurrentSet] = useState(1);
  const [pontosJogador1, setPontosJogador1] = useState(0);
  const [pontosJogador2, setPontosJogador2] = useState(0);
  const [setsJogador1, setSetsJogador1] = useState(0);
  const [setsJogador2, setSetsJogador2] = useState(0);
  const [partidaFinalizada, setPartidaFinalizada] = useState(false);
  const [pontuacoesJogador1, setPontuacoesJogador1] = useState([]);
  const [pontuacoesJogador2, setPontuacoesJogador2] = useState([]);
  const [cidade, setCidade] = useState();
  const [estado, setEstado] = useState();

  // Verifica se um jogador venceu o set atual, ou seja, atingiu pelo menos o minimo de pontos e tem vantagem de pelo menos dois pontos
  const verificarVitoriaSet = (pontosJogador, pontosOponente) => {
    return (pontosJogador >= pontosVencerSet && (pontosJogador - pontosOponente) >= 2);
  };

  //caso tenha marcado errado, podemos diminuir o ponto do jogador 
  const removerPonto = (jogador) => {
    if (partidaFinalizada) return;

    // Atualiza pontos do jogador
    if (jogador === 1) {
      setPontosJogador1(pontosJogador1 - 1);
    } else {
      setPontosJogador2(pontosJogador2 - 1);
    }
  }

  // Atualiza o placar e verifica condições de vitória
  const marcarPonto = (jogador) => {
    if (partidaFinalizada) return;

    // Atualiza pontos do jogador
    if (jogador === 1) {
      setPontosJogador1(pontosJogador1 + 1);
    } else {
      setPontosJogador2(pontosJogador2 + 1);
    }

    //Auxiliar para verificar quem recebeu o ponto e facilitar a verificacao, pois nao da pra usar diretamente do state que esta "desatualizado"
    const pontosAtuaisJogador1 = jogador === 1 ? pontosJogador1 + 1 : pontosJogador1;
    const pontosAtuaisJogador2 = jogador === 2 ? pontosJogador2 + 1 : pontosJogador2;

    if (verificarVitoriaSet(pontosAtuaisJogador1, pontosAtuaisJogador2) || verificarVitoriaSet(pontosAtuaisJogador2, pontosAtuaisJogador1)) {
      
      /**Atualiza a lista de pontos de cada jogador  */
      setPontuacoesJogador1((prevPontuacoes) => [...prevPontuacoes,pontosAtuaisJogador1,]);

      setPontuacoesJogador2((prevPontuacoes) => [...prevPontuacoes,pontosAtuaisJogador2,]);

      /**Variaveis auxiliares para verificar o fim da partida */
      let auxSetsJ1 = setsJogador1;
      let auxSetsJ2 = setsJogador2;
      if (pontosAtuaisJogador1 > pontosAtuaisJogador2) {
        setSetsJogador1(prevState => prevState + 1);
        auxSetsJ1 = setsJogador1 + 1;
      } else {
        setSetsJogador2(prevState => prevState + 1);
        auxSetsJ2 = setsJogador2 + 1;
      }

      //console.log("SETS j1", auxSetsJ1);
      //console.log("SETS j2", auxSetsJ2);
      //console.log("NUMERO DE SETS", nroDeSets);
      if ((auxSetsJ1 == (Math.ceil(nroDeSets/2))) && (auxSetsJ1> auxSetsJ2) || (auxSetsJ2 == Math.ceil((nroDeSets)/2)) && (auxSetsJ2 > auxSetsJ1)) {
        setPartidaFinalizada(true);
      }

      //console.log("setsJOgador1 ", setsJogador1);
      //console.log("setsJOgador2 ", setsJogador2);

      // Reinicia pontos para o próximo set
      setPontosJogador1(0);
      setPontosJogador2(0);
      setCurrentSet(currentSet + 1);
    }
  };

  // Finaliza a partida, "cria" a partida finalizada e adiciona ao historico (lista do App)
  const finalizarPartida = () => {
    const {AddHistorico} = route.params;
    const partidaCompleta = {
      nomeJogador1,
      nomeJogador2,
      pontosVencerSet,
      nroDeSets,
      setsJogador1,
      setsJogador2,
      pontuacoesJogador1,
      pontuacoesJogador2,
      data: new Date().toLocaleString(),
      cidade,
      estado,
    };

    AddHistorico(partidaCompleta);
    navigation.goBack(); // Volta para a tela anterior
  };
  

  /**API location, verificando se pode acessar a localizacao */
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      
      //pega a localizacao
      let location = await Location.getCurrentPositionAsync({});
      
      //"transforma" as coordenadas na latitude e longitude
      const {latitude, longitude} = location.coords;

      //transforma na localizacao (de coordenadas para "nomes")
      const localizacao = await Location.reverseGeocodeAsync({ latitude, longitude });

      if (localizacao.length > 0) {

        let cidade = localizacao[0].subregion.toString();
        let estado = localizacao[0].region.toString();
        setCidade(cidade);
        setEstado(estado);
      }
    })();
  }, []);
 

 
  return (

    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>

        <Text style={styles.titulo}>Placar do Jogo</Text>

        <View style={styles.setsContainer}>
          <Text style={styles.setText}>Set Atual: {currentSet}</Text>
          <Text style={styles.setText}>{setsJogador1} x {setsJogador2}</Text>
        </View>

        {/* Placar de pontos */}
        <View style={styles.placarContainer}>
          <View style={styles.jogadorContainer}>
            <Text style={styles.nomeJogador}>{nomeJogador1}</Text>
            <Text style={styles.pontos}>{pontosJogador1}</Text>
            
            <Button title="Pontuar" onPress={() => marcarPonto(1)} 
              color="#4CAF50"/>
              <Text></Text>
            <Button title="Remover Ponto" onPress={() => removerPonto(1)} 
              color="#fc0303"
              disabled={pontosJogador1 == 0}/>

          </View>

          <View style={styles.jogadorContainer}>
            <Text style={styles.nomeJogador}>{nomeJogador2}</Text>
            <Text style={styles.pontos}>{pontosJogador2}</Text>

            <Button title="Pontuar" onPress={() => marcarPonto(2)} 
              color="#4CAF50"/>
            <Text></Text>
            <Button title="Remover Ponto" onPress={() => removerPonto(2)} 
              color="#fc0303"
              disabled={pontosJogador2 == 0}/>

          </View>
        </View>

        {/* Botão de finalização */}
        {partidaFinalizada && (
          <Button 
            title="Finalizar Partida" 
            onPress={finalizarPartida} 
            color="#4CAF50"
          />
        )}
      
    </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,  
    justifyContent: 'space-between',  
    padding: 20,
    minHeight: Dimensions.get('window').height 
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },

  placarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },

  jogadorContainer: {
    alignItems: 'center',
  },

  nomeJogador: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: 'black'
  },
  pontos: {
    fontSize: 35,
    color: 'black',
    marginBottom: 0,
    alignSelf: 'center'
  },

  setsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },

  setText: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    fontSize: 16,
    color: '#black',
  },

  textoBotao:{
    color: 'black',
    textAlign:'center'
  },

  botaoRetorno:{
    borderRadius: 10,
    padding: 10,
    marginTop: 10,
    alignSelf: 'flex-end',  
    backgroundColor: '#3498db',
  }
});
