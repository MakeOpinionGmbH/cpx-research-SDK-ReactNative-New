import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { FunctionComponent } from "react";

import Header from "./Header";
import HomeScreen from "./Home.screen";
import Page2Screen from "./Page2.screen";

const Stack = createStackNavigator();

const App: FunctionComponent = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ header: () => <Header title="CPX React Native Demo" /> }} />
      <Stack.Screen name="Page 2" component={Page2Screen} options={{ header: () => <Header title="Demo App Page 2" /> }} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
