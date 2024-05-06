import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../pages/Welcome";
import SignIn from "../pages/Signin";
import SignInRest from "../pages/SignInRest";
import RegisterCli from "../pages/RegisterCli";
import RegisterRest from "../pages/RegisterRest";
import HomeCli from "../pages/HomeCli";

const Stack = createNativeStackNavigator();

export default function Routes() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Welcome"
                component={Welcome}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="SignIn"
                component={SignIn}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="SignInRest"
                component={SignInRest}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="RegisterCli"
                component={RegisterCli}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="RegisterRest"
                component={RegisterRest}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="HomeCli"
                component={HomeCli}
                options={{ headerShown: false }}
            />
        </Stack.Navigator>
    )
}