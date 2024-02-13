import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TabsParamList} from '../types/types';
import {ActivityIndicator, View} from 'react-native';
import TodoListScreen from '../screens/TodoListScreen';

export default function TabsNavigator() {
  const Tabs = createMaterialTopTabNavigator<TabsParamList>();

  return (
    <Tabs.Navigator
      sceneContainerStyle={{backgroundColor: 'transparent'}}
      screenOptions={{
        lazy: true,
        lazyPlaceholder: () => (
          <View
            style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <ActivityIndicator color={'white'} size={'large'} />
          </View>
        ),
        tabBarLabelStyle: {color: 'white', fontWeight: '600'},
        tabBarStyle: {backgroundColor: 'transparent'},
        tabBarIndicatorStyle: {backgroundColor: 'white'},
      }}>
      <Tabs.Screen
        name="All"
        component={TodoListScreen}
        initialParams={{filter: 'all'}}
      />
      <Tabs.Screen
        name="Finished"
        component={TodoListScreen}
        initialParams={{filter: 'finished'}}
      />
      <Tabs.Screen
        name="Unfinished"
        component={TodoListScreen}
        initialParams={{filter: 'unfinished'}}
      />
    </Tabs.Navigator>
  );
}
