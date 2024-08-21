import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'

interface CountdownProps {
  initialSeconds: number; // Tempo inicial em segundos
}

const Countdown: React.FC<CountdownProps> = ({ initialSeconds }) => {
  const [secondsLeft, setSecondsLeft] = useState<number>(initialSeconds);
  const [isRunning, setIsRunning] = useState<boolean>(false); // Controla se a contagem está em andamento

  useEffect(() => {
    if (!isRunning || secondsLeft === 0) {
      return;
    }


    const intervalId = setInterval(() => {
      setSecondsLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isRunning, secondsLeft]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
  };

  const startCountdown = () => {
    setIsRunning(true);
  };

  const stopCountdown = () => {
    setIsRunning(false);
  };

  const resetCountdown = () => {
    setIsRunning(false);
    setSecondsLeft(initialSeconds);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.timeText}>{formatTime(secondsLeft)}</Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.btnStart} onPress={startCountdown}>
            <MaterialIcons name='play-arrow' size={32} style={{color: '#ffffff'}} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnStop} onPress={stopCountdown}>
            <MaterialIcons name='pause' size={32} style={{color: '#ffffff'}} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btnReset} onPress={resetCountdown}>
            <MaterialIcons name='replay' size={32} style={{color: '#ffffff'}} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  content: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingBottom: 10,
  },
  timeText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  btnStart: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#078f00',
    padding: 10,
    borderRadius: 4,
    width: 60,
    height: 60,
  },
  btnStop: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fc1c03',
    padding: 10,
    borderRadius: 4,
    width: 60,
    height: 60,
  },
  btnReset: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fcba03',
    padding: 10,
    borderRadius: 4,
    width: 60,
    height: 60,
  },
});

export default Countdown;
