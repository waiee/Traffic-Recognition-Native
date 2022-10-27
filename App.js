import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import Routes from "./src/routes/Routes"
import React, { useState, useEffect } from "react";
import SimpleLoader from "./src/components/SimpleLoader";

export default function App() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 2000);
    },[]);

    return (
    <PaperProvider>
      <NavigationContainer >
          {show ? <Routes/> : <SimpleLoader/>}
      </NavigationContainer>
    </PaperProvider>
  );
}
