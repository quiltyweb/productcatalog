import { Environment, Network, RecordSource, Store } from "relay-runtime";

const getURI = () => {
  if (process.env.NODE_ENV === "test") {
    return (
      window.location.protocol +
      "//" +
      window.location.hostname +
      ":3000" +
      "/graphql"
    );
  }

  if (process.env.NODE_ENV !== "test") {
    if (typeof window.location !== "undefined") {
      return (
        window.location.protocol +
        "//" +
        window.location.hostname +
        ":" +
        window.location.port +
        "/graphql"
      );
    }
  }

  return "/graphql";
};

function fetchQuery(operation, variables) {
  const GRAPHQL_URI = getURI();
  return fetch(GRAPHQL_URI, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => {
    return response.json();
  });
}

const environment = new Environment({
  network: Network.create(fetchQuery),
  store: new Store(new RecordSource()),
});

export default environment;
