import axios from "axios"; 
import {useEffect, useState } from "react";
import {Link } from "react-router-dom";

export default function Comida(){

    const [comida, setComida] = useState([])

    useEffect(
        function(){

            async function consultar(){

                const resposta = await axios.get(`http://localhost:8000/api/comida/`) // adiciona a rota da API
                console.log(resposta)
                setComida(resposta.data)
            }
            consultar();
        }
        , []
    )


return(
    <div>
        <link to='/comida/create'>Novo</link>
        <table>
            <thead><tr>
                <th>Preço</th>
                <th>Validade</th>
                <th>Marca</th>
                <th>Tipo</th>
                <th>Sabor</th>
                <th>Data de Entrada</th>
                </tr></thead>
                <tbody>
                    {comida==null ? null :comida.map(
                        (comida) =>
                        <tr key={comida.id}>
                        <td>{comida.preco}</td>
                        <td>{comida.validade}</td>
                        <td>{comida.marco}</td>
                        <td>{comida.tipo}</td>
                        <td>{comida.sabor}</td>
                        <td>{comida.dataEntrada}</td>
                        <td><Link to={'/api/Comida/' + comida.id}>Alterar</Link></td>
                        <td><Link to={'/api/Comida/' + comida.id}>Excluir</Link></td>
                        </tr>
                    )
                }
                </tbody>
        </table>
        <Link to="/api/comida/">Voltar</Link>
    </div>
)
}