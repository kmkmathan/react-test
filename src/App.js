//import "./App.css";
import { React } from "react";
import { Route, Switch } from "react-router-dom";
import styled from "styled-components";
import Header from "./components/shared/header";
import Hero from "./components/hero";
import Section from "./layout/section";
import Launches from "./components/lanuches";
import Rockets from "./components/rockets";

const MainWrapper = styled.main`
  display: block;
  position: relative;
  width: 100%;

  .grid {
    display: flex;
    flex-wrap: wrap;
  }
`;

function App() {
  
  return (
    <MainWrapper>
      <Header />
      <Section>
        <Hero />
      </Section>
      <Switch>
        <Route exact path={"/launches"} component={Launches} />
        <Route exact path={"/rockets"} component={Rockets} />
      </Switch>
    </MainWrapper>
  );
}

export default App;
