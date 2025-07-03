import axios from 'axios';
import {useState , useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';

export default function ComidaDelete() {
    const {id} = useParams();
    const [comida, setComida] = useState({});
    const [status, setStatus] = useState("");
    const [botaoStatus, setbotaoStatus] = useState(true);

    useEffect(() => {
        async function Consultar() {
               const response = await axios.delete(`http://localhost:8000/comida/${id}`); // Alterado de racao para Comida
                setComida(response.data);
                setbotaoStatus(false);
        }
        Consultar();
    }, [id]);
    async function confirmar(e) {
        try{
            await axios.delete(`http://localhost:8000/api/comida ${id}`); 
            setStatus("Produto excluído com sucesso!");
            setComida({});
        } catch (erro) {
            setStatus(`Falha: ${erro}`);
        }
    }

    return (
        <div>
            <h3>{comida.nome}</h3>
            {status !=='Produto Excluido' ? <button onClick={confirmar} disabled={botaoStatus}>Confirmar Exclusão</button> : null}
            <h3>{status}</h3>
            <Link to='/Comida'>Voltar</Link>
        </div>
    );
}