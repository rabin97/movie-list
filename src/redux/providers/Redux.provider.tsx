import { ReactNode } from "react";
import { store, persistor } from "../app/store";
import { Provider } from "react-redux"
import { PersistGate } from "redux-persist/integration/react";

const AppProvider = ({ children }: { children: ReactNode }) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                {children}
            </PersistGate>
        </Provider>
    );
};

export default AppProvider;
