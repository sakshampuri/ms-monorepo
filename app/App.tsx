import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { AppLoading } from "expo";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { ThemeProvider } from "@shopify/restyle";
import { theme } from "./src/Restyle";
import { AuthenticationNavigator } from "./src/Authentication";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContext, authType } from "./src/Components";

export default () => {
    //Loading assets
    const [fontsLoaded, fontLoadError] = useFonts({
        "SF-Pro": require("./assets/fonts/SFProDisplay-Regular.ttf"),
        "SF-Pro-Bold": require("./assets/fonts/SFProDisplay-Bold.ttf"),
        "SF-Pro-Semibold": require("./assets/fonts/SFProDisplay-Semibold.ttf"),
    });
    const [authState, changeAuthState] = React.useState<authType["authState"]>({
        state: undefined,
        user: undefined,
    });
    const contextValue = { authState, changeAuthState };

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
                <AuthContext.Provider value={contextValue}>
                    <NavigationContainer>
                        <AuthenticationNavigator />
                    </NavigationContainer>
                </AuthContext.Provider>
            </ThemeProvider>
        </SafeAreaProvider>
    );
};
