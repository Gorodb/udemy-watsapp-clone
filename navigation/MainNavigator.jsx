import {SettingsScreen} from "../screens/SettingsScreen";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {ChatListScreen} from "../screens/ChatListScreen";
import {Ionicons} from "@expo/vector-icons";
import {ChatSettingsScreen} from "../screens/ChatSettingsScreen";
import {ChatScreen} from "../screens/ChatScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={{
      headerTitle: '',
      headerShadowVisible: false,
    }}>
      <Tab.Screen name="ChatList" component={ChatListScreen} options={{
        tabBarLabel: 'Chats',
        tabBarIcon: ({...props}) => <Ionicons name="chatbubble-outline" {...props} />,
      }} />
      <Tab.Screen name="Settings" component={SettingsScreen} options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({...props}) => <Ionicons name="settings-outline" {...props} />,
      }} />
    </Tab.Navigator>
  )
}

export const MainNavigator = (props) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Home"} component={TabNavigation} options={{
        headerShown: false
      }}/>
      <Stack.Screen name={"ChatScreen"} component={ChatScreen} options={{
        headerTitle: "",
        headerBackTitle: "Back",
      }}/>
      <Stack.Screen name={"ChatSettings"} component={ChatSettingsScreen} options={{
        headerTitle: "Settings",
        headerBackTitle: "Back",
      }}/>
    </Stack.Navigator>
  )
}