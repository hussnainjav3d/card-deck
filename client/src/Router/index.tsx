import { ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/deck/:id",
    element: <div>Hello world!</div>,
  },
  {
    path: "/",
    element: (
      <ChakraProvider>
        <App />
      </ChakraProvider>
    ),
  },
]);
