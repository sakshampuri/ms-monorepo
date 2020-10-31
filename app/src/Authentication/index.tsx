import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "../Components/Routes";

import Onboarding from "./Onboarding";
import Welcome from "./Welcome";
import Login from "./Login";
import { FirebaseContext, firebaseContextInfo } from "../Components";

const AuthenticationStack = createStackNavigator<Routes>();

export const AuthenticationNavigator = () => {
    return (
        <FirebaseContext.Provider value={firebaseContextInfo}>
            <AuthenticationStack.Navigator headerMode='none'>
                <AuthenticationStack.Screen
                    name='Onboarding'
                    component={Onboarding}
                />
                <AuthenticationStack.Screen
                    name='Welcome'
                    component={Welcome}
                />
                <AuthenticationStack.Screen name='Login' component={Login} />
            </AuthenticationStack.Navigator>
        </FirebaseContext.Provider>
    );
};
