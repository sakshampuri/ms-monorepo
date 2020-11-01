import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "../Components/Routes";

import Onboarding from "./Onboarding";
import Welcome from "./Welcome";
import Login from "./Login";
import {
    AuthContext,
    FirebaseContext,
    firebaseContextInfo,
} from "../Components";
import { HomeNavigator } from "../Home";

const AuthenticationStack = createStackNavigator<Routes>();

export const AuthenticationNavigator = () => {
    const { state: loginState } = React.useContext(AuthContext).authState;
    return (
        <FirebaseContext.Provider value={firebaseContextInfo}>
            <AuthenticationStack.Navigator headerMode='none'>
                {loginState !== "login" ? (
                    <>
                        <AuthenticationStack.Screen
                            name='Onboarding'
                            component={Onboarding}
                        />
                        <AuthenticationStack.Screen
                            name='Welcome'
                            component={Welcome}
                        />
                        <AuthenticationStack.Screen
                            name='Login'
                            component={Login}
                        />
                    </>
                ) : (
                    <AuthenticationStack.Screen
                        name='Home'
                        component={HomeNavigator}
                    />
                )}
            </AuthenticationStack.Navigator>
        </FirebaseContext.Provider>
    );
};
