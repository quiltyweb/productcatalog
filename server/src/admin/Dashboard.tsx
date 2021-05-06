import  React from "react";
import { useCurrentAdmin } from "admin-bro";
import { Box, Text , Section} from "@admin-bro/design-system";

const Dashboard:React.FunctionComponent = ():JSX.Element => {
  const [currentAdmin, setCurrentAdmin] = useCurrentAdmin()

  const dashBoardLinks = [{
    url: "https://www.gattoni.cl",
    label: "Ir a Gattoni.cl"
  },
  {
   url: "https://www.gmail.com",
   label: "Ir a Gmail"
 }]

  return (
    <Box variant="grey">
      <Section mb="xl">
        <Text>
          <p>Bienvenido/a: {currentAdmin.email}!</p>
          <p>Haga click en el menu lateral para crear, actualizar o borrar productos.</p>
        </Text>
      </Section>

      <Box flex flexDirection="row">
        {dashBoardLinks.map((item, index)=> (
          <Box key={item.label} variant="white" bg="primary20" m="lg" width={1/3}>
            <a href={item.url} target="_blank">{item.label}</a>
          </Box>
          ))
        }
      </Box>
    </Box>
  );
};

export default Dashboard;