import React, { useState } from 'react';
import { StyleSheet, Dimensions, TextInput, TouchableOpacity, View, GestureResponderEvent } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

interface ItemProps {
  label: string;
  onPress: (event: GestureResponderEvent) => void;
}

interface SectionProps {
  title: string;
  children: React.ReactNode;
}

const SettingsScreen: React.FC = () => {
  const [bugName, setBugName] = useState<string>('');
  const [bugEmail, setBugEmail] = useState<string>('');
  const [bugDescription, setBugDescription] = useState<string>('');

  const handleSupport = () => {
    alert('Contact: 0205464499/0598068923 or email frimpongemmanuelkwabena107@gmail.com');
  };

  const handleClearAllData = () => {
    setBugName('');
    setBugEmail('');
    setBugDescription('');
    alert('All data has been cleared!');
  };

  const handleResetData = () => {
    setBugName('');
    setBugEmail('');
    setBugDescription('');
    alert('All data has been reset!');
  };

  const handleSubmitBugReport = () => {
    alert('Bug report submitted!');
  };

  const Item: React.FC<ItemProps> = ({ label, onPress }) => (
    <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
      <Ionicons name="information-circle-outline" size={20} color="#4A90E2" />
      <ThemedText style={styles.itemLabel}>{label}</ThemedText>
      <Ionicons name="chevron-forward-outline" size={20} color="#888" />
    </TouchableOpacity>
  );

  const Section: React.FC<SectionProps> = ({ title, children }) => (
    <View style={styles.sectionContainer}>
      <ThemedText style={styles.sectionTitle}>{title}</ThemedText>
      {children}
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#F0F8FF', dark: '#333' }}
        headerImage={<Ionicons size={310} name="cog" style={styles.headerImage} />}
      >
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title" style={styles.titleText}>Settings</ThemedText>
        </ThemedView>
        <ThemedView style={styles.contentContainer}>
          <Section title="Help and Support">
            <Item label="Contact Support" onPress={handleSupport} />
          </Section>
          <Section title="Advanced Settings">
            <Item label="Data Reset" onPress={handleResetData} />
            <Item label="Clear All Data" onPress={handleClearAllData} />
          </Section>
          <ThemedText style={styles.label}>REPORT A BUG</ThemedText>
          <ThemedView style={styles.section}>
            <TextInput
              style={styles.input}
              placeholder="Your Name"
              value={bugName}
              onChangeText={setBugName}
            />
            <TextInput
              style={styles.input}
              placeholder="Your Email"
              value={bugEmail}
              onChangeText={setBugEmail}
            />
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Describe the bug"
              value={bugDescription}
              onChangeText={setBugDescription}
              multiline={true}
              numberOfLines={4}
            />
          </ThemedView>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmitBugReport}>
            <ThemedText style={styles.submitButtonText}>Submit Bug Report</ThemedText>
          </TouchableOpacity>
        </ThemedView>
      </ParallaxScrollView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -15,
    left: -25,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  titleText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  contentContainer: {
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    marginHorizontal: 10,
    marginTop: -20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 16,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 16,
    color: '#555',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
    padding: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginVertical: 8,
  },
  itemLabel: {
    fontSize: 16,
    color: '#333',
    flex: 1,
    marginLeft: 10,
  },
  sectionContainer: {
    marginVertical: 12,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom: 30,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SettingsScreen;

  