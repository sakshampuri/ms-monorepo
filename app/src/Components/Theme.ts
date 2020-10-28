import { createTheme } from "@shopify/restyle";

const palette = {
    black: "#0B0B0B",
    white: "#F0F2F3",

    fadedgray: "rgba(12,13,52, 0.05)",
    green: "#2CB9B0",
    darkblue: "#0C0D34",
    gray: "rgba(12,13,52,0.7)",
};

const theme = createTheme({
    colors: {
        //Background
        mainBackground: palette.white,
        white: palette.white,

        //Text
        secondaryText: palette.gray,
        primaryText: palette.darkblue,

        //Button
        secondaryBackground: palette.fadedgray,
        primaryBackground: palette.green,
    },
    spacing: {
        s: 8,
        m: 12,
        l: 24,
        xl: 40,
    },
    breakpoints: {},
    textVariants: {
        hero: {
            fontSize: 80,
            fontFanily: "SF-Pro-Bold",
            color: "mainBackground",
            textAlign: "center",
            textAlignVertical: "center",
        },
        title: {
            fontSize: 24,
            fontFamily: "SF-Pro-Semibold",
            color: "primaryText",
            marginBottom: "m",
            lineHeight: 30,
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

export type Theme = typeof theme;
export default theme;
