import { ThemeProvider } from "@mui/material";
import { DashboardTheme } from "./MUI_Theme/themeConfig";
import AlertComponent from "./Components/common/AlertComponent";
import StoreProvider from './redux/Provider/StoreProvider'
import Confirm from "./Components/common/Confirm";
import { useCommon } from "./Hooks/common/useCommon";

export const HOC = ({ children }) => {
    const selectedTheme = DashboardTheme('light');

    return (
        <StoreProvider>
            <ThemeProvider theme={selectedTheme}>
                <Theme>
                    <Confirm />
                    <AlertComponent />
                    {children}
                </Theme>
            </ThemeProvider>
        </StoreProvider>
    );
};

const Theme = ({ children }) => {
    const { theme } = useCommon();
    const selectedTheme = DashboardTheme(theme);

    return <ThemeProvider theme={selectedTheme}>{children}</ThemeProvider>;
};
