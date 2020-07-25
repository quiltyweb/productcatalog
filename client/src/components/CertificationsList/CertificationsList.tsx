import React from "react";
import { Heading, styled } from "fannypack";

const ListItem = styled.li`
  list-style: circle;
`;

const CertificationsList = () => {
  return (
    <>
      <Heading>Certificaciones</Heading>
      <Heading use="h2">
        Descargue aqui documentos que certifican la calidad de nuestos
        productos.
      </Heading>
      <ul style={{ listStyle: "square" }}>
        <ListItem>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni.rar"
          >
            Certificación Comercial Gattoni.
          </a>
        </ListItem>
        <ListItem>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-anteojos-policarbonato.rar"
          >
            Certificación Comercial Gattoni anteojos policarbonato.
          </a>
        </ListItem>
        <ListItem>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-cascos-proteccion-Industrial.rar"
          >
            Certificación Comercial Gattoni cascos proteccion Industrial.
          </a>
        </ListItem>
        <ListItem>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-guantes-seguridad.rar"
          >
            Certificación Comercial Gattoni guantes seguridad.
          </a>
        </ListItem>
        <ListItem>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-overol-verde.rar"
          >
            Certificación Comercial Gattoni overol verde.
          </a>
        </ListItem>
        <ListItem>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-productos-masprot.rar"
          >
            Certificación Comercial Gattoni productos masprot.
          </a>
        </ListItem>
        <ListItem>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-protector-ocular.rar"
          >
            Certificación Comercial Gattoni protector ocular.
          </a>
        </ListItem>
        <ListItem>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-ropa-soldador-seguridad.rar"
          >
            Certificación Comercial Gattoni ropa soldador seguridad.
          </a>
        </ListItem>
        <ListItem>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-zapatos.rar"
          >
            Certificación Comercial Gattoni zapatos.
          </a>
        </ListItem>
      </ul>
    </>
  );
};

export default CertificationsList;
