import React from "react";
import { BrowserRouter } from "react-router-dom";
import "./App.scss";
import { observer } from "mobx-react-lite";
import { Routes } from "Routes";
import { ContentWrapper } from "style";

const App = observer(() => {
  return (
    <div className="App">
      <ContentWrapper>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ContentWrapper>
    </div>
  );
});

export default App;
