import  React, { useState, useEffect } from "react";
import { ApiClient } from "admin-bro";
import { Box, Text , Section} from "@admin-bro/design-system";

const apiClient = new ApiClient();

const Stats:React.FunctionComponent = ():JSX.Element => {
  const [data, setData] = useState({});

  useEffect(() => {
    apiClient.getDashboard().then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <Box variant="grey">
      <Section mb="xl">
        <Text>Estadisticas de Gattoni.cl</Text>
      </Section>


    </Box>
  );
};

export default Stats;