import { ThemeProvider } from "@mui/material";
import { DashboardTheme } from "./MUI_Theme/themeConfig";
import { useInfo } from "./Hooks/useInfo";
import AlertComponent from "./Components/common/AlertComponent";
import StoreProvider from './redux/Provider/StoreProvider'

export const HOC = ({ children }) => {
    const selectedTheme = DashboardTheme('light');

    return (
        <StoreProvider>
            <ThemeProvider theme={selectedTheme}>
                <AlertComponent />
                <Theme>{children}</Theme>
            </ThemeProvider>
        </StoreProvider>
    );
};

const Theme = ({ children }) => {
    const { theme } = useInfo();
    const selectedTheme = DashboardTheme(theme);

    return <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>;
};
