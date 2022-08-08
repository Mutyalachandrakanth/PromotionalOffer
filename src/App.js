import "./css/App.css";
import Promo from "./promo";
import { Provider, connect } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import configureStore from "./store";
import React from "react";
const { persistor, store } = configureStore();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <div className="App">
          <Promo />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
