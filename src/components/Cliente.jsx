import { useNavigate } from 'react-router-dom'

const Cliente = ({ cliente,handleEliminar }) => {
    const navigate = useNavigate();
    const { id, nombre, empresa, email, telefono, notas } = cliente;
    return (
        <tr className='border hover:bg-gray-50'>
            <td className='p-3'>{nombre}</td>
            <td className='p-3'>
                <p className=''><span className="text-gray-800 uppercase font-bold">Email: </span>{email}</p>
                <p className=''><span className="text-gray-800 uppercase font-bold">Tel: </span>{telefono}</p>

            </td>
            <td>{empresa}</td>
            <td>
                <button
                    className='mt-3 bg-green-500 hover:bg-green-600 block w-full text-white p-2 uppercase font-bold text-xs'
                    type='button'
                    onClick={() => navigate(`/clientes/${id}`)}
                >Ver</button>
                <button
                    className='mt-3 bg-blue-600 hover:bg-blue-700 block w-full text-white p-2 uppercase font-bold text-xs'
                    type='button'
                    onClick={() => navigate(`/clientes/editar/${id}`)}
                >Editar</button>

                <button
                    className='my-3 bg-red-600 hover:bg-red-700 block w-full text-white p-2 uppercase font-bold text-xs'
                    type='button'
                    onClick={() => handleEliminar(id)}
                >Eliminar</button>
            </td>

        </tr>

    )
}

export default Cliente