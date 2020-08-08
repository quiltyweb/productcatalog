import React from "react";
import { Spinner } from "fannypack";

const Loader: React.FunctionComponent = (): JSX.Element => {
  return (
    <div style={{ padding: "1rem" }}>
      <Spinner size="medium" color="danger" />
      Cargando...
    </div>
  );
};

export default Loader;
