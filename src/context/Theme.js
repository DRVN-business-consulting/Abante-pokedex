import React from 'react'

const Theme = React.createContext({
    light: {
        backgroundColor: '#121212',

    },
    dark: {
        backgroundColor: '#FFF',

    }
})

export const ThemeProvider = ({ children }) => {

    const [theme, setTheme] = React.useState('dark')

    return (
        <Theme.Provider value={{ theme, setTheme }}>
            {children}
        </Theme.Provider>
    )
};

export const useTheme = () => {
    return React.useContext(Theme)
}