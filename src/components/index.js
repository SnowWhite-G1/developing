import React, { useState, useEffect, useContext, Fragment } from "react";
import axios from "axios";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fab from "@material-ui/core/Fab";
import { blueGrey } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
  loadRoot: {
    display: "flex",
    alignItems: "center",
  },
  wrapper: {
    position: "relative",
  },
  buttonProgress: {
    position: "absolute",
    top: "20%",
    left: "30%",
    color: blueGrey[300],
  },
}));

const useApi = (initSearch, initData) => {
  const [data, setData] = useState(initData);
  const [search, setSearch] = useState(initSearch);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const requestData = async () => {
      setLoading(true);
      const result = await axios(search);
      setData(result.data);
      setLoading(false);
    };
    requestData();
  }, [search]);

  return [{ data, loading }, setSearch];
};

export default function IndexComp() {
  const [query, setQuery] = useState();
  const [
    { data, loading },
    doFetch,
  ] = useApi("https://hn.algolia.com/api/v1/search?query=redux", { hits: [] });
  const classes = useStyles();
  return (
    <Fragment>
      <TextField
        label="Query"
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      ></TextField>
      <div className={classes.loadRoot}>
        <div className={classes.wrapper}>
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={loading}
            onClick={() => {
              doFetch(`https://hn.algolia.com/api/v1/search?query=${query}`);
            }}
          >
            Search
          </Button>
          {loading && (
            <CircularProgress size={24} className={classes.buttonProgress} />
          )}
        </div>
      </div>
      {data &&
        data.hits &&
        data.hits.length > 0 &&
        data.hits.map((item, index) => {
          return <div key={index + Math.random()}>{item.title}</div>;
        })}
    </Fragment>
  );
}

function Index() {
  const params = useCount();
  return (
    <React.Fragment>
      Hello World!{params.countLength}
      <span>{params.count}</span>
    </React.Fragment>
  );
}

function useCount() {
  const [count, setCount] = useState(0);

  const [countLength, setCountLength] = useState(0);

  useEffect(() => {
    setCountLength(count);
  }, [count]);

  setInterval(() => {
    setCount(count + 1);
  }, 2000);

  return { count, countLength };
}
