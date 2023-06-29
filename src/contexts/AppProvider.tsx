import ThemeProvider from "./ThemeProvider";
import { store } from "store/configureStore";
import { Provider } from "react-redux";
import MainLayout from "layouts/MainLayout";
type AppProviderProps = {
  children?: React.ReactNode;
};

const AppProvider = (props: AppProviderProps) => {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <MainLayout {...props} />
      </Provider>
    </ThemeProvider>
  );
};

export default AppProvider;
