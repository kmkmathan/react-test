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

const RocketSection = styled.section`
  margin-bottom: 40px;
  position: relative;
  input{
    position: absolute;
    left: calc(5% + 30px);
    top: -80px;
    padding: 10px 15px;
  }
`;

function App() {
  
  const handler = (event) => {
    if (event.charCode === 13) {
      const searchLaunchData = async () => {
        const result = await axios(
          "http://localhost:4000/api/launches?search=" + event.target.value
        );
        setData({ launches: result.data.data.docs });
        if (result.data.data.docs.length) {
          setNodatafound(true);
        } else {
          setNodatafound(false);
        }
        setLoading(false);
      };
      searchLaunchData();
    }
  };

  const [data, setData] = useState({ launches: [] });
  const [nodatafound, setNodatafound] = useState(false);
  const [rocketdata, setRocketdata] = useState({ rocket: [] });
  const [loading, setLoading] = useState(true);
  const [rocketloading, setRocketloading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "http://localhost:4000/api/launches?limit=12"
      );

      setData({ launches: result.data.data.docs });
      setLoading(false);
    };

    fetchData();

    const fetchRocketData = async () => {
      const result = await axios(
        "http://localhost:4000/api/rockets?limit=12"
      );

      setRocketdata({ rocket: result.data.data.docs });
      setRocketloading(false);
    };
    fetchRocketData();
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
          <RocketSection>
            <input onKeyPress={(e) => handler(e)} type="text" placeholder="Search launches" />
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
            {!nodatafound && <div>Data not found</div>}
          </RocketSection>
        </Route>
        <Route path="/rockets">
        <Section>
            {rocketloading && <div>rocketloading....</div>}
            {!rocketloading && (
              <Wrapper>
                <Grid>
                  {rocketdata.rocket.map((item, index) => (
                    <Column layout={4} columns={1} key={index.toString()}>
                      <LaunchCard
                        key={index.toString()}
                        image={item.flickr_images[0]}
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
