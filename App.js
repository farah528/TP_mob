import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import AppDrawer from "./navigation/AppDrawer";
import LoginScreen from "./screens/LoginScreen";
import { Provider } from "react-redux";
import { store } from "./store/store";

function RootNavigator() {
   const { user } = useContext(AuthContext);
   return user ? <AppDrawer /> : <LoginScreen />;
}

export default function App() {
   return (
      <Provider store={store}>
         <AuthProvider>
            <ThemeProvider>
               <NavigationContainer>
                  <RootNavigator />
               </NavigationContainer>
            </ThemeProvider>
         </AuthProvider>
      </Provider>
   );
}
