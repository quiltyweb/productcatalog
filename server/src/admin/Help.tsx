import { Box, Text , Section, Header} from "@admin-bro/design-system";
import { ReactVideo } from "reactjs-media";

const Help = () => {
  return (
    <Box variant="grey">
        <Header.H1>Tutoriales</Header.H1>
        <Section style={{marginBottom: '3rem'}}>
        <Header.H2>Paso 1: ingresar al admin</Header.H2>
        <Text>En este video, revisaremos como acceder al dashboard con usuario y contraseña</Text>
        <ReactVideo
          src="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/tutorials/paso1-ingresar-al-admin.mp4"
          poster="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/tutorials/comercial-gattoni-video-poster-1.jpg"
          primaryColor="#D23700"
        />
        </Section>

        <Section style={{marginBottom: '3rem'}}>
        <Header.H2>Paso 2: listar y filtrar productos</Header.H2>
        <Text>En este video revisaremos la lista de productos y el boton "filtrar"</Text>
        <ReactVideo
          src="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/tutorials/paso2-listar-y-filtrar-productos.mp4"
          poster="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/tutorials/comercial-gattoni-video-poster-1.jpg"
          primaryColor="#D23700"
        />
        </Section>

        <Section style={{marginBottom: '3rem'}}>
        <Header.H2>Paso 3: agregar pdf adjunto</Header.H2>
        <Text>En este video revisaremos como agregar pdf a un producto existente</Text>
        <ReactVideo
          src="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/tutorials/paso3-actualizar-producto-existente-con-pdf.mp4"
          poster="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/tutorials/comercial-gattoni-video-poster-1.jpg"
          primaryColor="#D23700"
        />
        </Section>

        <Section style={{marginBottom: '3rem'}}>
        <Header.H2>Paso 4: agregar y eliminar producto</Header.H2>
        <Text>En este video revisaremos como agregar  eliminar nuevo producto</Text>
        <ReactVideo
          src="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/tutorials/paso4-agregar-y-eliminar-nuevo-producto.mp4"
          poster="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/tutorials/comercial-gattoni-video-poster-1.jpg"
          primaryColor="#D23700"
        />
        </Section>
    </Box>
  );
};

export default Help;