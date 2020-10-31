import {
    createBox,
    createRestyleComponent,
    createText,
    createTheme,
    createVariant,
    VariantProps,
} from "@shopify/restyle";

const palette = {
    black: "#0B0B0B",
    white: "#F0F2F3",

    fadedgray: "rgba(12,13,52, 0.05)",
    green: "#2CB9B0",
    greenFaded: "rgba(44, 185, 176, 0.4)",
    darkblue: "#0C0D34",
    gray: "rgba(12,13,52,0.7)",
    onyx: "#0F0E0C",
    amarnath: "#D82F51",
};

const theme = createTheme({
    colors: {
        //Background
        mainBackground: palette.white,
        white: palette.white,
        darkBrown: palette.onyx,
        danger: palette.amarnath,

        //Text
        secondaryText: palette.gray,
        primaryText: palette.darkblue,
        red: "#FF0000",
        green: palette.green,
        black: "#000000",

        //Button
        secondaryBackground: palette.fadedgray,
        primaryBackground: palette.green,
        defaultBorder: "rgba(11,14,50, 0.2)",
        selectedBorder: palette.greenFaded,
    },
    spacing: {
        s: 8,
        m: 12,
        l: 24,
        xl: 40,
    },
    borderRadii: {
        s: 5,
        m: 25,
        l: 75,
        xl: 90,
    },
    breakpoints: {},
    textVariants: {
        hero: {
            fontSize: 80,
            fontFamily: "SF-Pro-Bold",
            color: "mainBackground",
            textAlign: "center",
            textAlignVertical: "center",
        },
        title: {
            fontSize: 24,
            fontFamily: "SF-Pro-Bold",
            color: "primaryText",
            marginBottom: "m",
            lineHeight: 30,
            alignSelf: "center",
            alignItems: "center",
        },
        subtitle: {
            fontSize: 16,
            lineHeight: 24,
            color: "secondaryText",
            textAlign: "center",
            marginBottom: "xl",
            fontFamily: "SF-Pro",
        },
        label: {
            textAlign: "center",
            textAlignVertical: "center",
            fontSize: 18,
            fontFamily: "SF-Pro",
            color: "white",
        },
    },
    buttonVariants: {
        default: {
            backgroundColor: "secondaryBackground",
            color: "primaryText",
        },
        primary: {
            backgroundColor: "primaryBackground",
            color: "white",
        },
    },
});

export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export type ButtonProps = VariantProps<Theme, "buttonVariants"> & {
    label: string;
    onPress: () => void;
    style?: {};
};
const ButtonVariant = createVariant<Theme>({
    themeKey: "buttonVariants",
    defaults: {
        height: 50,
        width: 255,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "m",
    },
});

export const ButtonContainer = createRestyleComponent<
    VariantProps<Theme, "buttonVariants">,
    Theme
>([ButtonVariant]);

export type Theme = typeof theme;
export default theme;
