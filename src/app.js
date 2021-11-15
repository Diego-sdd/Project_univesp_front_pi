import React from "react";
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './redux/store/store';

import Routes from "./routes";

const App = () => {
   // if (process.env.NODE_ENV !== 'development') {
   //    console.log = function no_console() {};
   // }
   return (
      <Provider store={store}>
         <PersistGate loading={null} persistor={persistor}>
            <Routes />
         </PersistGate>
      </Provider>
   )
}


export default App;