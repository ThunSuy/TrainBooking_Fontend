import React from "react";
import "../src/assets/style/main.scss";
import Header from "./parts/Header/Header";
import Regulation from "./parts/Regulation/Regulation";
import AppRoutes from "./routes/AppRoutes";

const App = () => {
  return (
    <div className="app">
      <Header />
      <div className="app_content">
        <AppRoutes />
        <Regulation />
      </div>
    </div>
  );
};

export default App;
