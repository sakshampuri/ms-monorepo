import * as React from "react";
import Constants from "expo-constants";
import firebase from "firebase";
import * as Google from "expo-auth-session/providers/google";
import { Alert, Platform, ToastAndroid } from "react-native";

export { default as Button } from "./Button";
export { default as PageIndicator } from "./PageIndicator";
export { default as Container } from "./Container";

export const showErr = (err: string) => {
    Platform.select({
        ios: Alert.alert("Alert", err, [{ text: "OK" }]),
        android: ToastAndroid.show(err, ToastAndroid.LONG),
    });
};

export const firebaseContextInfo = {
    config: {
        apiKey: process.env.API_KEY,
        authDomain: process.env.AUTH_DOMAIN,
        databaseURL: process.env.DATABASE_URL,
        projectId: process.env.PROJECT_ID,
        storageBucket: process.env.STORAGE_BUCKET,
        messagingSenderId: process.env.MESSAGING_SENDER_ID,
        appId: process.env.APP_ID,
        measurementId: process.env.MEASUREMENT_ID,
    },
    firebase: {},
};

export const FirebaseContext = React.createContext(firebaseContextInfo);

export type userType = {
    name: string;
    email: string;
    picture: string;
};

export type authState = {
    state: "login" | "logout" | undefined;
    user?: userType | undefined;
};

export type authType = {
    changeAuthState: React.Dispatch<React.SetStateAction<authState>>;
    authState: authState;
};

export const AuthContext = React.createContext<authType>({
    changeAuthState: () => null,
    authState: {
        state: undefined,
        user: undefined,
    },
});

export const useFirebaseAuth = () => {
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseContextInfo.config);
        console.log("inputconfig: ", firebaseContextInfo.config);
    }

    const { authState, changeAuthState } = React.useContext(AuthContext);

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            androidClientId: Constants.manifest.extra.androidClientId,
            iosClientId: Constants.manifest.extra.iosClientId,
            clientId: Constants.manifest.extra.clientId,
        },
        {
            useProxy: true,
        }
    );

    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        if (response?.type === "success") {
            setLoading(true);
            const { id_token } = response.params;

            const credential = firebase.auth.GoogleAuthProvider.credential(
                id_token
            );
            firebase.auth().signInWithCredential(credential);

            firebase.auth().onAuthStateChanged((user) => {
                console.log("listerner user: ", user);
                if (user) {
                    const userSet = {
                        name: user.displayName,
                        email: user.email,
                        picture: user.photoURL,
                    };
                    changeAuthState({ user: userSet, state: "login" });
                } else {
                    changeAuthState({ state: "logout" });
                }
                setLoading(false);
            });
        }
    }, [response]);
    return [promptAsync, authState, loading];
};
