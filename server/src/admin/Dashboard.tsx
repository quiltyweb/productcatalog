import  React, { useState, useEffect } from "react";
import { ApiClient } from "admin-bro";
import { Box, Text , Section} from "@admin-bro/design-system";

const apiClient = new ApiClient();

const Dashboard:React.FunctionComponent = ():JSX.Element => {
  const [data, setData] = useState({});
 const dashBoardLinks = [{
   url: "https://www.gattoni.cl",
   label: "Ir a Gattoni.cl"
 },
 {
  url: "https://www.gmail.com",
  label: "Ir a Gmail"
}]
  useEffect(() => {
    apiClient.getDashboard().then((response) => {
      setData(response.data);
    });
  }, []);

  return (
    <Box variant="grey">
      <Section mb="xl">
        <Text>
          Haga click en el menu lateral para crear, actualizar o borrar productos.
        </Text>
      </Section>

      <Box flex flexDirection="row">
        {dashBoardLinks.map((item, index)=> (
          <Box variant="white" bg="primary20" m="lg" width={1/3}>
            <a href={item.url} target="_blank">{item.label}</a>
          </Box>
          ))
        }
      </Box>
    </Box>
  );
};

export default Dashboard;