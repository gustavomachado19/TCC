// src/components/Header.js

import React, { useState, useContext } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Button, Portal, Dialog } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Flag from './Flag';
import Timer from './Timer';
import LinearGradient from 'react-native-linear-gradient';
import { GameContext } from '../context/GameContext'; // Importar o GameContext
import { getLevelKey } from '../utils/levelUtils'; // Importar a função getLevelKey

const Header = ({ flagsLeft, onNewGame, onExit, onFlagPress, timerRef }) => {
  console.log('Header.js re-render');

  const [menuVisible, setMenuVisible] = useState(false);

  // Acessar o estado do contexto
  const { state } = useContext(GameContext);
  const levelKey = getLevelKey(state.level);
  const bestTime = state.bestTimes[levelKey];

  console.log('Header.js - state.level:', state.level);
  console.log('Header.js - levelKey:', levelKey);
  console.log('Header.js - bestTime:', bestTime);

  // Função para formatar o tempo
  const formatTime = (time) => {
    if (time === null || time === undefined) return '-';
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const openMenu = () => {
    timerRef.current.stop();
    setMenuVisible(true);
  };

  const closeMenu = () => {
    setMenuVisible(false);
    timerRef.current.start();
  };

  const handleNewGame = () => {
    closeMenu();
    onNewGame();
  };

  const handleExit = () => {
    closeMenu();
    onExit();
  };

  return (
    <LinearGradient colors={['#72a34d', '#527a33']}>
      <View style={styles.container}>
        <View style={styles.flagContainer}>
          <TouchableOpacity style={styles.flagButton} onPress={onFlagPress}>
            <Flag bigger={true} />
          </TouchableOpacity>
          <Text style={styles.flagsLeft}>= {flagsLeft}</Text>
        </View>

        <View style={styles.timerAndBestTimeContainer}>
          <View style={styles.timerContainer}>
            <Timer ref={timerRef} style={styles.timer} />
          </View>
          <View style={styles.bestTimeContainer}>
            <Text style={styles.bestTimeLabel}>🏆 Melhor Tempo: {formatTime(bestTime)}</Text>
          </View>
        </View>

        <TouchableOpacity onPress={openMenu} style={styles.iconButton}>
          <Icon name="pause-circle" size={45} color="white" />
        </TouchableOpacity>

        <Portal>
          <Dialog visible={menuVisible} onDismiss={closeMenu} style={styles.dialogContainer}>
            <LinearGradient colors={['#2f3640', '#222']} style={styles.menu}>
              <Dialog.Title style={styles.containerTitle}>Pausado</Dialog.Title>
              <Dialog.Content>
                <View style={styles.buttonContainer}>
                  <TouchableOpacity onPress={handleNewGame}>
                    <LinearGradient colors={['#72a34d', '#527a33']} style={styles.button}>
                      <Text style={styles.textButtonMenu}>Novo Jogo</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleExit}>
                    <LinearGradient colors={['#e55039', '#b33939']} style={styles.button}>
                      <Text style={styles.textButtonMenu}>Menu principal</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </Dialog.Content>
              <Dialog.Actions>
                <Button style={styles.buttonCancel} onPress={closeMenu}>
                  <Text style={styles.textButtonMenu}>Cancelar</Text>
                </Button>
              </Dialog.Actions>
            </LinearGradient>
          </Dialog>
        </Portal>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    height: 80,
    borderRadius: 20,
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flagButton: {
    marginLeft: 10,
  },
  flagsLeft: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'white',
  },
  timerAndBestTimeContainer: {
    alignItems: 'center',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timer: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  bestTimeContainer: {
    marginTop: 5,
  },
  bestTimeLabel: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  iconButton: {
    padding: 5,
    alignSelf: 'center',
  },
  dialogContainer: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    alignItems: 'center',
  },
  containerTitle: {
    fontWeight: 'bold',
    color: 'white',
  },
  menu: {
    borderRadius: 20,
    height: 350,
    width: 350,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  button: {
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  textButtonMenu: {
    color: 'white',
    fontSize: 17,
    fontWeight: 'bold',
  },
  buttonCancel: {
    marginTop: 15,
  },
});

export default Header;
