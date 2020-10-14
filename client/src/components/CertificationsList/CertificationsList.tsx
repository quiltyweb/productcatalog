import React from "react";
import { Heading, PageContent, List, Paragraph } from "bumbag";

const CertificationsList = () => {
  return (
    <PageContent breakpoint="desktop">
      <Heading use="h2" fontSize="400" paddingBottom="1rem">
        Certificaciones
      </Heading>
      <Paragraph paddingBottom="2rem">
        Descargue documentos que certifican la calidad de nuestos productos.
      </Paragraph>
      <List style={{ listStyle: "disc" }}>
        <List.Item paddingBottom="1rem">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni.rar"
          >
            Certificación Comercial Gattoni
          </a>
        </List.Item>
        <List.Item paddingBottom="1rem">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-anteojos-policarbonato.rar"
          >
            Certificación Comercial Gattoni anteojos policarbonato
          </a>
        </List.Item>
        <List.Item paddingBottom="1rem">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-cascos-proteccion-Industrial.rar"
          >
            Certificación Comercial Gattoni cascos proteccion Industrial
          </a>
        </List.Item>
        <List.Item paddingBottom="1rem">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-guantes-seguridad.rar"
          >
            Certificación Comercial Gattoni guantes seguridad
          </a>
        </List.Item>
        <List.Item paddingBottom="1rem">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-overol-verde.rar"
          >
            Certificación Comercial Gattoni overol verde
          </a>
        </List.Item>
        <List.Item paddingBottom="1rem">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-productos-masprot.rar"
          >
            Certificación Comercial Gattoni productos masprot
          </a>
        </List.Item>
        <List.Item paddingBottom="1rem">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-protector-ocular.rar"
          >
            Certificación Comercial Gattoni protector ocular
          </a>
        </List.Item>
        <List.Item paddingBottom="1rem">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-ropa-soldador-seguridad.rar"
          >
            Certificación Comercial Gattoni ropa soldador seguridad
          </a>
        </List.Item>
        <List.Item paddingBottom="1rem">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/certificaciones/certification-comercial-gattoni-zapatos.rar"
          >
            Certificación Comercial Gattoni zapatos
          </a>
        </List.Item>
      </List>
    </PageContent>
  );
};

export default CertificationsList;
