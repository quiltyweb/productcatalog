import { Box, Text , Section, Header} from "@admin-bro/design-system";

const Help = () => {
  return (
    <Box variant="grey">
        <Header.H1>Tutoriales</Header.H1>
        <Section style={{marginBottom: '3rem'}}>
        <Header.H2>Paso 1: ingresar al admin</Header.H2>
        <Text>En este video, revisaremos como acceder al dashboard con usuario y contraseña</Text>
        <div>Seccion en construccion</div>
        </Section>

        <Section style={{marginBottom: '3rem'}}>
        <Header.H2>Paso 2: listar y filtrar productos</Header.H2>
        <Text>En este video revisaremos la lista de productos y el boton "filtrar"</Text>
        <div>Seccion en construccion</div>
        </Section>

        <Section style={{marginBottom: '3rem'}}>
        <Header.H2>Paso 3: agregar pdf adjunto</Header.H2>
        <Text>En este video revisaremos como agregar pdf a un producto existente</Text>
        <div>Seccion en construccion</div>
        </Section>

        <Section style={{marginBottom: '3rem'}}>
        <Header.H2>Paso 4: agregar y eliminar producto</Header.H2>
        <Text>En este video revisaremos como agregar  eliminar nuevo producto</Text>
        <div>Seccion en construccion</div>
        </Section>
    </Box>
  );
};

export default Help;