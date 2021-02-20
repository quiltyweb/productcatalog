import { Environment, Network, RecordSource, Store } from "relay-runtime";

const getURI = () => {
  return (
    window.location.protocol +
    "//" +
    window.location.hostname +
    ":" +
    window.location.port +
    "/graphql"
  );
};

function fetchQuery(operation, variables) {
  const GRAPHQL_URI = getURI();
  console.log("GRAPHQL_URI >>>>>>", GRAPHQL_URI);
  return fetch(GRAPHQL_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => {
      return error;
    });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
