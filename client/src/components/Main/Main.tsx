import React from "react";
import { Heading, Paragraph } from "fannypack";

const Main = () => {
  return (
    <>
      <Heading>Sómos Seguridad Industrial</Heading>
      <Heading use="h2">
        Con más de 20 años de experiencia en la Región de Atacama.
      </Heading>
      <Paragraph>
        Comercial Gattoni le da la más cordial bienvenida y le invita a conocer
        su amplia gama de productos de seguridad Industrial. Somos una Empresa
        con más de 20 años de experiencia en el área de venta de artículos de
        Seguridad Industrial, ubicada en Copiapó, Región de Atacama.
      </Paragraph>
      <Paragraph>
        Ofrecemos a Ud. y empresa productos de la más alta calidad como Botas de
        Agua, Mascaras de protección Respiratoria, servicios de Bordados
        industriales computacionales y más. Distribuidores de Vicsa en Copiapó.
      </Paragraph>
      <Heading use="h2" id="heading-direccion">
        Visítenos en:
      </Heading>
      Rodriguez # 757 Local A Copiapó, Chile.{" "}
      <a
        href="https://goo.gl/maps/T8kEzuyJijXt6iy66"
        target="_blank"
        rel="noopener noreferrer"
      >
        (Ver mapa)
      </a>
      <ul>
        <li>Fono Fax: (52) 2 218056</li>
        <li>Fono: (52) 2 216257</li>
        <li>
          Correo Ventas:{" "}
          <img
            style={{ verticalAlign: "middle" }}
            src="https://product-catalog.sfo2.cdn.digitaloceanspaces.com/assets/correo-gattoni-punto-cl.jpg"
            width="175"
            height="15"
            alt="comercialgattoni arroba gattoni punto cl"
          />
        </li>
      </ul>
      <Heading use="h2" id="heading-horarios">
        Horarios de atención:
      </Heading>
      <ul>
        <li>Lunes a Viernes de 9:30 a 13:30 y 15:30 a 18:30</li>
      </ul>
      <Heading use="h2" id="heading-pagos">
        Medios de Pago:
      </Heading>
      <ul>
        <li>Red compra, Visa 3 cuota, Efectivo ó Transferencia Bancaria.</li>
      </ul>
    </>
  );
};

export default Main;
