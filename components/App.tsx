import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StackParamList} from '../types/types';

import {TodosProvider} from '../contexts/TodosContext';

import HomeScreen from '../screens/HomeScreen';
import ExpandedTodoScreen from '../screens/ExpandedTodoScreen';

const App = () => {
  const Stack = createNativeStackNavigator<StackParamList>();

  return (
    <TodosProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen
            name="ExpandedTodo"
            component={ExpandedTodoScreen}
            options={{presentation: 'containedTransparentModal'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </TodosProvider>
  );
};

export default App;
