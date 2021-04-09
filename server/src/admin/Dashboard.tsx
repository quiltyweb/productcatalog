import  React, { useState, useEffect } from "react";
import { ApiClient } from "admin-bro";
import { Box, Text , Section} from "@admin-bro/design-system";

const apiClient = new ApiClient();

const Dashboard:React.FunctionComponent = ():JSX.Element => {
  const [data, setData] = useState({});

  useEffect(() => {
    apiClient.getDashboard().then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <Box variant="grey">
      <Section mb="xl">
        <Text>Haga click en el menu lateral para crear, actualizar o borrar productos.</Text>
      </Section>

      <Box flex flexDirection="row">
        <Box variant="white" bg="primary20" m="lg" width={1/3}>
          some: {data.some}
        </Box>

        <Box variant="white" bg="primary20" m="lg" width={1/3}>
          <a href="https://productcatalog.herokuapp.com/" target="_blank">Ir a Gattoni.cl</a>
        </Box>

        <Box variant="white" bg="primary20" m="lg" width={1/3}>
          <a href="https://productcatalog.herokuapp.com/" target="_blank">Ir a Gattoni.cl</a>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;