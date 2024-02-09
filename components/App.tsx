import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {StackParamList} from '../types/types';

import HomeScreen from '../screens/HomeScreen';
import ExpandedTodoScreen from '../screens/ExpandedTodoScreen';

const App = () => {
  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen name="ExpandedTodo" component={ExpandedTodoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
