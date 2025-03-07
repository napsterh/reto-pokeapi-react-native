import react from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';

const Stack = createStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Lista de Pokemones" component={HomeScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default StackNavigator;