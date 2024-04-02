// src/App.tsx
import React from "react";
import { Provider } from "react-redux";
import store from "./store/store";
import ProductList from "./components/ProductList";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ProductList />
    </Provider>
  );
};

export default App;
