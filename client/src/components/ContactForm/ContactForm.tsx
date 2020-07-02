import React from 'react'
import { InputField, Button, Box, TextareaField, Heading } from 'fannypack'
import { useFormik } from 'formik'

const ContactForm = () => {
  const formik = useFormik({
    initialValues: {
      nombre: '',
      empresa: '',
      email: '',
      mensaje: '',
      telefono: ''
    },
    validate: ({ nombre, empresa, email, mensaje }) => {
      const errors: any = {}
      if (!nombre) {
        errors['nombre'] = 'Nombre es requerido';
      }
      if (!empresa) {
        errors['empresa'] = 'Empresa es requerido';
      }
      if (!email) {
        errors['email'] = 'Email es requerido';
      }
      if (!mensaje) {
        errors['mensaje'] = 'Mensaje es requerido';
      }
      
      return errors;
    },
    onSubmit: (values) => {
      console.log('onSubmit', values)
    },
  })

  return (
    <Box>
      <Heading>Contacto - Comercial Gattoni</Heading>
      <form onSubmit={formik.handleSubmit}>
        <InputField
          padding="major-2"
          id="nombre"
          name="nombre"
          isRequired
          type="text"
          label="Nombre"
          placeholder="nombre"
          value={formik.values.nombre}
          onChange={formik.handleChange}
          validationText={formik.errors.nombre}
          state={formik.errors.nombre ? 'danger' : ''}
          size="medium"
        />
        <InputField
          padding="major-2"
          id="empresa"
          name="empresa"
          isRequired
          type="text"
          label="Empresa"
          placeholder="Empresa"
          value={formik.values.empresa}
          onChange={formik.handleChange}
          validationText={formik.errors.empresa}
          state={formik.errors.empresa ? 'danger' : ''}
          size="medium"
        />
        <InputField
          padding="major-2"
          id="email"
          name="email"
          isRequired
          type="email"
          label="E-mail"
          placeholder="example@email.com"
          value={formik.values.email}
          onChange={formik.handleChange}
          validationText={formik.errors.email}
          state={formik.errors.email ? 'danger' : ''}
          size="medium"
        />
        <InputField
          padding="major-2"
          id="telefono"
          name="telefono"
          type="text"
          label="Telefono"
          placeholder="Telefono"
          value={formik.values.telefono}
          onChange={formik.handleChange}
          validationText={formik.errors.telefono}
          state={formik.errors.telefono ? 'danger' : ''}
          size="medium"
        />
        <TextareaField
          padding="major-2"
          name="mensaje"
          label="Comentario"
          isRequired
          value={formik.values.mensaje}
          onChange={formik.handleChange}
          validationText={formik.errors.mensaje}
          state={formik.errors.mensaje ? 'danger' : ''}
        />
        <Button margin="major-2" padding="major-1" type="submit">Enviar</Button>
      </form>
    </Box>
  )
}

export default ContactForm
