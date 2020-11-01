import * as React from "react";
import Constants from "expo-constants";
import firebase from "firebase";
import * as Google from "expo-auth-session/providers/google";

export { default as Button } from "./Button";
export { default as PageIndicator } from "./PageIndicator";
export { default as Container } from "./Container";

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

export type authType = {
    changeAuthState: React.Dispatch<React.SetStateAction<any>>;
    authState: {
        state: "login" | "logout" | undefined;
        user?: userType | undefined;
    };
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

    const [_, response, promptAsync] = Google.useIdTokenAuthRequest({
        clientId: Constants.manifest.extra.clientId,
    });

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
                    setLoading(false);
                    changeAuthState({ user: userSet, state: "login" });
                } else {
                    setLoading(false);
                    changeAuthState({ state: "logout" });
                }
            });
        }
    }, [response]);
    return [promptAsync, authState, loading];
};
