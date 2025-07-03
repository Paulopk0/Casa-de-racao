import Estoque from './Estoque';
import Layout from './Layout';
import Comida from './Comida';
import Home from './Home';
import ComidaCreate from './Comida/create';
import ComidaUpdate from './Comida/update'; 
import ComidaDelete from './Comida/delete';

import {BrowserRouter, Routes, Route } from 'react-router-dom'

export default function Rotas(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Layout/>} >
                    <Route path="/Home" element={ <Home/>} /> 
                    <Route path="/Estoque" element={ <Estoque/>} />
                    <Route path="/Comida" element={ <Comida/>} />
                    <Route path="/Comida/create" element={ <ComidaCreate/>} />
                    <Route path="/Comida/update/:id" element={ <ComidaUpdate/>} />
                    <Route path="/Comida/delete/:id" element={ <ComidaDelete/>} />
                    <Route path="*" element={ <h1>Errou algo ai paizao</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}