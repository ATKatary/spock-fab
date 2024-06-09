import { COLORS, THEME } from "./constants";

export const styles = {
    button: {
        width: 275,
        borderRadius: 0,
        boxShadow: "none",
        color: COLORS.WHITE,
        margin: `7.5px 0 0 0`,
        textTransform: "none",
        fontSize: THEME.FONT.PARAGRAPH,
        backgroundColor: THEME.DOMINANT,
        '&:hover': {
            backgroundColor: THEME.ACTIVE_ACCENT,
        },
        '&:active': {
            backgroundColor: THEME.ACTIVE_ACCENT,
        },
    },

    navigationButton: {
        height: 40, 
        width: 40, 
        color: THEME.ACTIVE_ACCENT
    },

    testimonialImage: {
        maxWidth: "98%", 
        height: 350, 
        border: `1px solid ${THEME.ACTIVE_ACCENT}`
    },

    formField: {
        width: 275,
        margin: 7.5,
        fontSize: THEME.FONT.PARAGRAPH,
        '&:active': {
            border: `1px solid ${COLORS.WHITE}`
        }
    },
}