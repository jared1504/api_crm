import React from 'react';
import { Formik, Form, Field } from 'formik';
import { Navigate, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Alerta from './Alerta';
import Spinner from './Spinner';

const Formulario = ({ cliente, cargando }) => {
    const navigate = useNavigate();

    const nuevoClienteSchema = Yup.object().shape({
        nombre: Yup.string()
            .min(3, 'El nombre es muy corto')
            .max(20, 'El nombre es muy largo')
            .required('El nombre del cliente es obligatorio'),
        empresa: Yup.string()
            .required('El nombre de la empresa es obligatorio'),
        email: Yup.string()
            .email('El email no es válido')
            .required('El email es obligatorio'),
        telefono: Yup.number()
            .positive('El teléfono no es válido')
            .integer('El teléfono no es válido')
            .typeError('El teléfono no es válido')
            .required('El teléfono es obligatorio'),
    })

    const handleSubmit = async (valores) => {
        try {
            let resp;
            if (cliente.id) {
                //editar cliente
                const url = `http://localhost:4000/clientes/${cliente.id}`;
                resp = await fetch(url, {
                    method: 'PUT',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
            } else {
                //guardar cliente
                const url = "http://localhost:4000/clientes";
                resp = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify(valores),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

            }
            await resp.json();
            navigate('/clientes');//redireccionar

        } catch (error) {
            console.log(error);
        }
    }

    return (
        cargando ? <Spinner /> : (
            <div className='bg-white mt-10 px-5 py-10 rounded-md shadow-md md:w-3/4 mx-auto'>
                <h1 className="text-gray-500 font-bold text-xl uppercase text-center">
                    {cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                </h1>
                <Formik
                    initialValues={{
                        nombre: cliente?.nombre ?? "",
                        empresa: cliente?.empresa ?? "",
                        email: cliente?.email ?? "",
                        telefono: cliente?.telefono ?? "",
                        notas: cliente?.notas ?? "",
                    }}
                    enableReinitialize={true}//poner valores existentes
                    onSubmit={async (values, { resetForm }) => {
                        await handleSubmit(values);
                        resetForm();//limpiar formulario
                    }}
                    validationSchema={nuevoClienteSchema}
                >
                    {({ errors, touched }) => {

                        return (


                            <Form className='mt-10'>
                                <div className="mb-4">
                                    <label
                                        htmlFor="nombre"
                                        className='text-gray-800 '
                                    >Nombre:</label>
                                    <Field
                                        id="nombre"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        placeholder="Nombre del Cliente"
                                        name="nombre"
                                    />
                                    {errors.nombre && touched.nombre ? (
                                        <Alerta>{errors.nombre}</Alerta>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="empresa"
                                        className='text-gray-800 '
                                    >Empresa:</label>
                                    <Field
                                        id="empresa"
                                        type="text"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        placeholder="Empresa del Cliente"
                                        name="empresa"
                                    />
                                    {errors.empresa && touched.empresa ? (
                                        <Alerta>{errors.empresa}</Alerta>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="email"
                                        className='text-gray-800 '
                                    >Email:</label>
                                    <Field
                                        id="email"
                                        type="email"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        placeholder="Email del Cliente"
                                        name="email"
                                    />
                                    {errors.email && touched.email ? (
                                        <Alerta>{errors.email}</Alerta>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="telefono"
                                        className='text-gray-800 '
                                    >Teléfono:</label>
                                    <Field
                                        id="telefono"
                                        type="tel"
                                        className="mt-2 block w-full p-3 bg-gray-50"
                                        placeholder="Teléfono del Cliente"
                                        name="telefono"
                                    />
                                    {errors.telefono && touched.telefono ? (
                                        <Alerta>{errors.telefono}</Alerta>
                                    ) : null}
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="notas"
                                        className='text-gray-800 '
                                    >Notas:</label>
                                    <Field
                                        as="textarea"
                                        id="notas"
                                        type="text"
                                        className="h-40 mt-2 block w-full p-3 bg-gray-50"
                                        placeholder="Notas del Cliente"
                                        name="notas"
                                    />

                                </div>

                                <input
                                    type="submit"
                                    value={cliente?.nombre ? 'Editar Cliente' : 'Agregar Cliente'}
                                    className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-bold text-lg"
                                />
                            </Form>

                        )

                    }}
                </Formik>
            </div>
        )
    )
}
Formulario.defaultProps = {
    cliente: {},
    cargando: false
}


export default Formulario