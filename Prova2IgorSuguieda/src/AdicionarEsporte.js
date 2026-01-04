import React, { useState} from "react";
import {View, KeyboardAvoidingView, TextInput, StyleSheet, Text, Platform,TouchableWithoutFeedback, Keyboard, TouchableHighlight} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
export default function AdicionarEsporte({ navigation, AddEsporte }) { // Recebe AddEsporte como prop
  // Estado único para todos os campos
  const [formData, setFormData] = useState({
    pontosVencerSet: "",
    nroDeSets: "",
    nomeJogador1: "",
    nomeJogador2: ""
  });

  // Atualiza o State com base no parametro que recebe field campo a ser alterado e value o valor que mnudara
  const onChangeText = (field, value) => {
    setFormData({...formData,[field]: value,});
  };

  const submit = () => {
    const { pontosVencerSet, nroDeSets, nomeJogador1, nomeJogador2 } = formData;
  
    // Verifica se a entrada de valores relacionados a partida e valida
    if (!pontosVencerSet || !nroDeSets || isNaN(pontosVencerSet) || isNaN(nroDeSets) || Number(pontosVencerSet) <= 0 || Number(nroDeSets) <= 0) {
      alert('Insira valores válidos!');
      return;
    }
  
    // Vai para a tela de placar com os dados preenchidos
    navigation.navigate("Placar", {
      pontosVencerSet: Number(pontosVencerSet),
      nroDeSets: Number(nroDeSets),
      nomeJogador1,
      nomeJogador2,
    });
  
    //Limpa os "buffers"
    setFormData({
      pontosVencerSet: "",
      nroDeSets: "",
      nomeJogador1: "",
      nomeJogador2: ""
    });
  };

  /**Ajusta para que caso seja web nao tenha a API keyboard (keyboard.dismiss) da uma bugada no pc */
  if(Platform.OS === 'web'){
    return (
      <ScrollView>
    <View style={styles.container}>
      <Text style={styles.heading}>Placar Fácil</Text>
      
      <TextInput
        placeholder="Pontos para vencer um Set"
        onChangeText={(val) => onChangeText("pontosVencerSet", val)}
        style={styles.input}
        keyboardType="numeric"
        value={formData.pontosVencerSet}
      />

      <TextInput
        placeholder="Número de sets"
        onChangeText={(val) => onChangeText("nroDeSets", val)}
        style={styles.input}
        keyboardType="numeric"
        value={formData.nroDeSets}
      />

      <TextInput
        placeholder="Jogador 1/Time 1"
        onChangeText={(val) => onChangeText("nomeJogador1", val)}
        style={styles.input}
        value={formData.nomeJogador1}
      />

      <TextInput
        placeholder="Jogador 2/Time 2"
        onChangeText={(val) => onChangeText("nomeJogador2", val)}
        style={styles.input}
        value={formData.nomeJogador2}
      />

      <TouchableHighlight 
        onPress={submit} 
        style={styles.button} 
        underlayColor="#e67395"
      >
        <Text style={styles.buttonText}>Adicionar Esporte</Text>
      </TouchableHighlight>

    </View>
    </ScrollView>
    )
  }else{

    //API keyboard 
    return (
      <ScrollView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
  
      <View style={styles.container}>
        <Text style={styles.heading}>Placar </Text>
        
        <TextInput
          placeholder="Pontos para vencer um Set"
          onChangeText={(val) => onChangeText("pontosVencerSet", val)}
          style={styles.input}
          keyboardType="numeric"
          value={formData.pontosVencerSet}
        />
  
        <TextInput
          placeholder="Número de sets"
          onChangeText={(val) => onChangeText("nroDeSets", val)}
          style={styles.input}
          keyboardType="numeric"
          value={formData.nroDeSets}
        />
  
        <TextInput
          placeholder="Jogador 1/Time 1"
          onChangeText={(val) => onChangeText("nomeJogador1", val)}
          style={styles.input}
          value={formData.nomeJogador1}
        />
  
        <TextInput
          placeholder="Jogador 2/Time 2"
          onChangeText={(val) => onChangeText("nomeJogador2", val)}
          style={styles.input}
          value={formData.nomeJogador2}
        />
  
        <TouchableHighlight 
          onPress={submit} 
          style={styles.button} 
          underlayColor="#e67395"
        >
          <Text style={styles.buttonText}>Adicionar Esporte</Text>
        </TouchableHighlight>
  
      </View>
      
      </TouchableWithoutFeedback>
      </ScrollView>
    );
  }
}

/**Styles da tela de adicionar Esporte*/
const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    flex: 1
  },
  heading:{
    fontSize: 24, 
    marginBottom: 20 
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc',
    borderRadius: 5, 
    padding: 10, 
    marginBottom: 10
  },
  button: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5
  },
  buttonText: { 
    color: 'white',
    textAlign: 'center'
  }
});