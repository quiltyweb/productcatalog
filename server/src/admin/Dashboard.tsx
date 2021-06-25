import { useCurrentAdmin } from "admin-bro";
import { Box, Text , Section} from "@admin-bro/design-system";

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
        <ul id="dashboard-quick-access-links">
        {dashBoardLinks.map((item, index)=> (
          <li>
          <Box key={item.label} variant="white" bg="primary20" m="lg" width={1/3}>
            <a href={item.url} target={item.target}>{item.label}</a>
          </Box>
          </li>
          ))
        }
        </ul>
      </Box>
    </Box>
  );
};

export default Dashboard;