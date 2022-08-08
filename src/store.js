import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import rootReducer from "./reducer/index";
import { createStore, combineReducers } from "redux";

function configureStore(initialState = {}) {
  const reducer = combineReducers({
    promo: persistReducer(
      {
        key: "initialTime",
        storage,
        debug: true,
      },
      rootReducer
    ),
  });
  const store = createStore(
    persistReducer(
      {
        key: "root",
        debug: true,
        storage,
      },
      reducer
    ),
    initialState
  );
  const persistor = persistStore(store, null, () => {});
  return { store, persistor };
}
export default configureStore;
