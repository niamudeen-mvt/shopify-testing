import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "./context/authContext";
import { Provider } from "react-redux";
import { store } from "./store/index";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AuthProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </AuthProvider>
);
