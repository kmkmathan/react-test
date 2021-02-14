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
`

const Nofound = styled.div`
    text-align: center;
    margin-bottom: 200px;
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
const PageListCont = styled.ul`
  display: flex;
  justify-content: space-between;
  padding: 0 10px 0 30px;
  margin-bottom: 20px;
`;

const PageList = styled.li`
  &.disabled {
    cursor: not-allowed;
    opacity: .4;
  }
  button {
    border: none;
    min-width: 120px;
    padding: 15px;
    background: #000000;
    color: #ffffff;
    cursor: pointer;
    &:hover{
      background: #999999;
    }
  }
`;

function Launches() {

    const [data, setData] = useState({ launches: [] });
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [page, setPage] = useState(0);
    
    const close = () => {
        setLoading(false);
        setSearch('');
    };


  useEffect(() => {
    const fetchData = async () => {
        setLoading(true);
        const result = await axios(
            `http://localhost:4000/api/launches?limit=12&search=${search}&page=${page}`
        );
    
        setData({ launches: result.data.data });
        setLoading(false);
    };

    fetchData()
  }, [search, page]);

  const pagination = (param) => {
    if (param === 1) {
        setPage(page - 1)
    } else {
        setPage(page + 1)
    }
  };

  
  return (
          <Wrapper>
            <InputWrap>
                <Input type="text" defaultValue={search} onChange={(e) => setSearch(e.target.value)}placeholder="Search launches" />
                {search && <Close onClick={close}>&#10005;</Close> }
            </InputWrap>
            {loading && <Loader>loading....</Loader>}
            {!loading && (
                <Grid>
                  {data.launches?.docs?.map((item, index) => (
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
            {data.launches?.docs?.length === 0 && !loading  && <Nofound>Data not found</Nofound>}
            {data.launches?.docs?.length !== 0 &&  !loading && <PageListCont>
                <PageList className={page  === 0 ? 'disabled': ''}>
                <button onClick={() => {
                    if(page <= data.launches?.totalPages && page > 0) {
                        pagination(1)
                    }
                }}>Prev</button>
                </PageList>
                <PageList className={page  === data.launches?.totalPages ? 'disabled': ''}>
                <button onClick={() => {
                     if(page >= 0) {
                        pagination(2)
                    }
                }}>Next</button>
                </PageList>
            </PageListCont>}
          </Wrapper>
  );
}

export default Launches;
