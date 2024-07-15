import "./App.css";
import { NextUIProvider } from "@nextui-org/react";
import { Button } from "@nextui-org/react";

const App = () => {
  return (
    <NextUIProvider>
      <Button color="primary">Button</Button>
    </NextUIProvider>
  );
};

export default App;
