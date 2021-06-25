import { useCurrentAdmin } from "admin-bro";
import { Box, Text , Section} from "@admin-bro/design-system";
import styled from 'styled-components';

const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  li {
    background: white;
    padding: 2rem;
    margin: 1rem;
  }
`

const Dashboard= () => {
  const [currentAdmin] = useCurrentAdmin()

  const dashBoardLinks = [
    {
      url: "/admin/pages/Tutoriales",
      label: "Ver Tutoriales",
      target: "_parent"
    },
    {
      url: "https://www.gattoni.cl",
      label: "Ir a Gattoni.cl",
      target: "_blank"
    },
    {
      url: "https://www.gmail.com",
      label: "Ir a Gmail",
      target: "_blank"
  }
]

  return (
    <Box variant="grey">
      <Section mb="xl">
        <Text>
          <p>Bienvenido/a: {currentAdmin.email}!</p>
          <p>Haga click en el menu lateral para crear, actualizar o borrar productos.</p>
        </Text>
      </Section>

      <Box flex flexDirection="row">
        <List>
        {dashBoardLinks.map((item, index)=> (
          <li>
            <a href={item.url} target={item.target}>{item.label}</a>
          </li>
          ))
        }
        </List>
      </Box>
    </Box>
  );
};

export default Dashboard;