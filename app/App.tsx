import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Onboarding from "./src/Authentication/Onboarding";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { SafeAreaView, Text, View } from "react-native";

const AuthenticationStack = createStackNavigator();

const AuthenticationNavigator = () => {
    return (
        <AuthenticationStack.Navigator headerMode='none'>
            <AuthenticationStack.Screen
                name='Onboarding'
                component={Onboarding}
            />
        </AuthenticationStack.Navigator>
    );
};

export default () => {
    const [fontsLoaded, fontLoadError] = useFonts({
        "SF-Pro": require("./assets/fonts/SFProDisplay-Regular.ttf"),
        "SF-Pro-Bold": require("./assets/fonts/SFProDisplay-Bold.ttf"),
        "SF-Pro-Semibold": require("./assets/fonts/SFProDisplay-Semibold.ttf"),
    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } else if (fontLoadError) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text>{fontLoadError}</Text>
            </View>
        );
    }

    return (
        <NavigationContainer>
            <AuthenticationNavigator />
        </NavigationContainer>
    );
};
