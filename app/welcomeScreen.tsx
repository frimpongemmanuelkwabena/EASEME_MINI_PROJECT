import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

interface WelcomeScreenProps {
  onContinue: () => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onContinue }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>EASEME</Text>
      <Button title="Continue" onPress={onContinue} color="#FF6F61" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#72ccfa', 
    padding: 16,
  },
  title: {
    fontSize: 42, 
    marginBottom: 40, 
    fontWeight: 'bold',
    color: '#FF6F61', 
    textAlign: 'center',
    fontFamily: 'cursive', 
    shadowColor: '#000', 
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
  },
});

export default WelcomeScreen;

