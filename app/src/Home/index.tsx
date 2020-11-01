import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Routes } from "../Components/Routes";
import Home from "./Home";

const HomeStack = createStackNavigator<Routes>();

export const HomeNavigator = () => {
    return (
        <HomeStack.Navigator headerMode='none'>
            <HomeStack.Screen name='Home' component={Home} />
        </HomeStack.Navigator>
    );
};
