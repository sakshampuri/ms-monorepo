import * as React from "react";
import { Box, Text } from "../../Restyle";
import { Container } from "../../Components";
import Footer from "./Footer";
import { BorderlessButton } from "react-native-gesture-handler";
import LoginForm from "./LoginForm";
interface Props {}

const footer: React.ReactNode = (
    <Box justifyContent='space-between' marginVertical='l'>
        <Footer />
        <Box flexDirection='row' justifyContent='center' mt='l'>
            <Text color='white'>Don't Have an Account?</Text>
            <BorderlessButton borderless={false} activeOpacity={0.5}>
                <Text color='primaryBackground'> Sign Up here</Text>
            </BorderlessButton>
        </Box>
    </Box>
);

const Login: React.FC<Props> = ({}) => {
    return (
        <Box flex={1}>
            <Container {...{ footer }}>
                <Box justifyContent='center' flex={1}>
                    <Box p='xl'>
                        <Text variant='title'>Welcome Back</Text>
                        <Text variant='subtitle'>
                            Use your credentials below and login to your account
                        </Text>
                    </Box>
                    <LoginForm />
                </Box>
            </Container>
        </Box>
    );
};

export default Login;
