import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import Formulario from '../components/Formulario'
import { Navigate, useNavigate } from 'react-router-dom';


const EditarCliente = () => {
  const { id } = useParams();
  const [cliente, setCliente] = useState({});
  const [cargando, setCargando] = useState(true);
const navigate = useNavigate();
  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const url = `${import.meta.env.VITE_API_URL}/${id}`;
        const resp = await fetch(url);
        const resul = await resp.json();
        setCliente(resul);
      } catch (error) {
        console.log(error);
      }
      setCargando(false);
    }
    obtenerClienteAPI();
  }, []);

  return (
    <>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className="mt-3">Edita los dats de un cliente</p>
      {cliente?.nombre ? (
        < Formulario
          cliente={cliente}
          cargando={cargando}
        />
      ):navigate('/clientes')}

    </>
  )
}

export default EditarCliente