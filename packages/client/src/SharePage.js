import {
  Box,
} from '@primer/components'
import React, {useEffect, useState} from "react";
import {useRequest, useToggle} from "ahooks";
import {RequestDetail} from "./components/RequestDetail";

export function SharePage({ id }) {
  const {loading, data} = useRequest(getRequestHistory, { defaultParams: [id] });
  console.log(loading, data)
  return (
    <Box m={4} p={3} bg="bg.primary" borderRadius={2} boxShadow="2px 2px #eee" minHeight={640}>
      {!loading && <RequestDetail data={data.data} user={data.user} width={"100%"} />}
    </Box>
  );
}

async function getRequestHistory(id) {
  return fetch(process.env.REACT_APP_WS_URL + 'request/' + id).then(function (response) {
    return response.json();
  })
}