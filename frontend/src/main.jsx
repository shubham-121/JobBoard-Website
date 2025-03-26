import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { Provider } from "react-redux";

import appRouter from "./appRouter.jsx";
import reduxStore from "./Redux/store.js";

import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={reduxStore}>
      <RouterProvider router={appRouter}>
        <App />
      </RouterProvider>
    </Provider>
  </StrictMode>
);
