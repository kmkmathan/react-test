import { React, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Wrapper from "../layout/wrapper";
import LaunchCard from "./lauch-card";
import Grid from "../layout/grid";
import Column from "../layout/column";

const Loader = styled.div`
    text-align: center;
    margin-bottom: 200px;
    margin-top: 100px;
`

const Nofound = styled.div`
    text-align: center;
    margin-bottom: 200px;
`

function Rockets() {

  const [data, setData] = useState({ rocket: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios(
      "http://localhost:4000/api/rockets"
    );

    setData({ rocket: result.data.data.docs });
    setLoading(false);
  };
  
  return (
    <Wrapper>
        {loading && <Loader>loading....</Loader>}
        {!loading && (
              <Grid>
                  {data.rocket.map((item, index) => (
                  <Column layout={12} columns={4} key={index.toString()}>
                      <LaunchCard
                      key={index.toString()}
                      image={item.flickr_images[0]}
                      title={item.name}
                      description={item.description}
                      />
                  </Column>
                  ))}
              </Grid>
        )}
        {data?.rocket?.length === 0 && !loading  && <Nofound>Data not found</Nofound>}
    </Wrapper>
  );
}

export default Rockets;
