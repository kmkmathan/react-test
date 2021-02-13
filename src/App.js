import "./App.css";
import { React, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import Header from "./components/shared/header";
import Hero from "./components/hero";
import Section from "./layout/section";
import Wrapper from "./layout/wrapper";
import LaunchCard from "./components/lauch-card";
import Grid from "./layout/grid";
import Column from "./layout/column";

const MainWrapper = styled.main`
  display: block;
  position: relative;
  width: 100%;

  .grid {
    display: flex;
    flex-wrap: wrap;
  }
`;

const ContentSelector = styled.div`
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: center;

  button {
    border: none;
    padding: 10px;
    min-width: 100px;
    margin-right: 10px;
  }
`;

function App() {
  const [data, setData] = useState({ launches: [], rocket: [] });
  const [loading, setLoading] = useState(true);
  // const [rocketloading, setRocketloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://localhost:4000/api/launches?limit=12"
      );

      console.log(result.data);

      setData({ launches: result.data.data.docs });
      setLoading(false);
    };
    fetchData();

    // const fetchRocketData = async () => {
    //   const result = await axios(
    //     "http://localhost:4000/api/rockets?limit=12"
    //   );

    //   console.log(result.data);

    //   setData({ rocket: result.data.data.docs });
    //   setRocketloading(false);
    // };
    // fetchRocketData();
  }, []);

  return (
    <MainWrapper>
      <Header />
      <Section>
        <Hero />
      </Section>
      <Section>
        <ContentSelector>
          <button>Launches</button>
          <button>rockets</button>
        </ContentSelector>
      </Section>
      <Switch>
        <Route path="/launches">
          <Section>
            {loading && <div>loading....</div>}

            {!loading && (
              <Wrapper>
                <Grid>
                  {data.launches.map((item, index) => (
                    <Column layout={12} columns={4} key={index.toString()}>
                      <LaunchCard
                        key={index.toString()}
                        image={item.links.patch.small}
                        title={item.name}
                        description={item.details}
                      />
                    </Column>
                  ))}
                </Grid>
              </Wrapper>
            )}
          </Section>
        </Route>
        <Route path="/rockets">
        <Section>
            {loading && <div>loading....</div>}

            {!loading && (
              <Wrapper>
                <Grid>
                  {data.launches.map((item, index) => (
                    <Column layout={12} columns={4} key={index.toString()}>
                      <LaunchCard
                        key={index.toString()}
                        image={item.links.patch.small}
                        title={item.name}
                        description={item.details}
                      />
                    </Column>
                  ))}
                </Grid>
              </Wrapper>
            )}
          </Section>
        </Route>
      </Switch>
    </MainWrapper>
  );
}

export default App;
