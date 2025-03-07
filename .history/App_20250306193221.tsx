import { StyleSheet, Text, View } from 'react-native';
import { PokemonProvider } from './src/context/PokemonContext';
import StackNavigator from './src/StackNavigator';

export default function App() {
  return (
    <PokemonProvider>
      <StackNavigator />
    </PokemonProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
