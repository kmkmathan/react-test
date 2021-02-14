import { React, useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Wrapper from "../layout/wrapper";
import LaunchCard from "./lauch-card";
import Grid from "../layout/grid";
import Column from "../layout/column";


const Loader = styled.div`
    text-align: center;
`

const Nofound = styled.div`
    text-align: center;
`

const InputWrap = styled.div`
    text-align: right;
    position: relative;
`
const Input = styled.input`
    height: 30px;
    border: 1px solid #ddd;
    margin: 14px;
    padding: 3px 19px;
`

const Close = styled.div`
    position: absolute;
    right: 24px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
`

function Launches() {

    const [data, setData] = useState({ launches: [] });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    
    const close = () => {
        setLoading(false);
        setSearch('');
    };


  useEffect(() => {
    const fetchData = async (page = 0) => {
        setLoading(true);
        const result = await axios(
            `http://localhost:4000/api/launches?limit=12&search=${search}&page=${page}`
        );
    
        setData({ launches: result.data.data.docs });
        setLoading(false);
    };

    fetchData()
  }, [search]);

  
  return (
          <Wrapper>
            <InputWrap>
                <Input type="text" defaultValue={search} onChange={(e) => setSearch(e.target.value)}placeholder="Search launches" />
                {search && <Close onClick={close}>&#10005;</Close> }
            </InputWrap>
            {loading && <Loader>loading....</Loader>}
            {!loading && (
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
            )}
            {data.launches.length === 0 && !loading  && <Nofound>Data not found</Nofound>}
          </Wrapper>
  );
}

export default Launches;
