import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "./src/Restyle";
import { AuthenticationNavigator } from "./src/Authentication";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default () => {
    //Loading assets
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
        <SafeAreaProvider>
            <ThemeProvider theme={theme}>
                <NavigationContainer>
                    <AuthenticationNavigator />
                </NavigationContainer>
            </ThemeProvider>
        </SafeAreaProvider>
    );
};
