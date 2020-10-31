import * as React from "react";
import { KeyboardAvoidingView, StyleSheet, TextInput } from "react-native";
import { useForm, Controller, FieldError, DeepMap } from "react-hook-form";
import { Box, theme } from "../../Restyle";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { Button } from "../../Components";
import { color } from "@shopify/restyle";

type colorStates = "black" | "green" | "red";

type inputFieldsType = {
    name: string;
    icon?: (state: colorStates) => JSX.Element | JSX.Element;
    rules?: {
        pattern?: RegExp;
        required?: boolean;
    };
    placeholder?: string;
};

const inputFields: Array<inputFieldsType> = [
    {
        name: "email",
        icon: (state: colorStates) => (
            <AntDesign name='mail' size={24} color={state} />
        ),
        rules: {
            required: true,
            pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        },
        placeholder: "Enter your email",
    },
    {
        name: "password",
        icon: (state: colorStates) => (
            <AntDesign name='lock1' size={24} color={state} />
        ),
        placeholder: "Enter your password",
        rules: {
            required: true,
        },
    },
];

const FieldRender = (
    { icon, placeholder, name }: inputFieldsType,
    errors: DeepMap<Record<string, any>, FieldError>,
    focus: boolean
) => ({ onChange, onBlur, value }) => {
    const colorScheme: colorStates = errors[name]
        ? "red"
        : focus
        ? "green"
        : "black";
    return (
        <Box
            flexDirection='row'
            mx='xl'
            my='m'
            borderRadius='s'
            alignItems='center'
            height={50}
            borderWidth={1}
            borderColor={colorScheme}
        >
            <Box px='m' opacity={0.5}>
                {icon(colorScheme)}
            </Box>
            <TextInput
                {...{ onBlur, value, placeholder }}
                onChangeText={(value) => onChange(value)}
                style={{ flex: 1, paddingHorizontal: 10 }}
                secureTextEntry={name === "password"}
                autoCapitalize='none'
            />
            <Box px='m'>
                {errors[name] ? (
                    <EvilIcons name='close-o' size={24} color='red' />
                ) : (
                    <EvilIcons name='check' size={24} color='green' />
                )}
            </Box>
        </Box>
    );
};

const styles = StyleSheet.create({});

interface Props {}

const LoginForm: React.FC<Props> = ({}) => {
    const { control, handleSubmit, errors } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    const [focus, changeFocus] = React.useState(false);

    return (
        <Box flex={1}>
            {inputFields.map((field, index) => (
                <Controller
                    key={index}
                    control={control}
                    render={FieldRender(field, errors, focus)}
                    name={field.name}
                    rules={field.rules}
                    defaultValue=''
                    onFocus={() => changeFocus(!focus)}
                />
            ))}
            <Box flex={1} justifyContent='flex-end' py='l'>
                <Button
                    label='Login to your account'
                    onPress={handleSubmit(onSubmit)}
                    variant='primary'
                    style={{ backgroundColor: "#56BB9E" }}
                />
            </Box>
        </Box>
    );
};

export default LoginForm;
