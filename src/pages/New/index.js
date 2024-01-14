import './new.css';
import Title from '../../components/Title';
import Header from '../../components/Header';
import { FiPlusCircle } from 'react-icons/fi';
import { useState } from 'react';

export default function New(){

    const [customers, setCustomers] = useState({});
    const [complemento, setComplemento] = useState('');
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');

    function handleOptionChance(event){
        setStatus(event.target.value);
    }

    return(
        <div>

            <Header/>

            <div className='content'>

                <Title name="Novo chamado">
                    <FiPlusCircle size={25}/>
                </Title>

                <div className='container'>

                    <form className='form-profile'>

                        <label>Clientes</label>
                        <select>
                            <option key={1} value={1}>Mercado Teste</option>
                            <option key={2} value={2}>Loja Informática</option>
                        </select>

                        <label>Assunto</label>
                        <select>
                            <option value="Suporte">Suporte</option>
                            <option value="Visita Técnica">Visita Técnica</option>
                            <option value="Financeiro">Financeiro</option>
                        </select>

                        <label>Status</label>
                        <div className='status'>
                            
                            <input type='radio' name='radio' value="Aberto" onChange={handleOptionChance} checked={ status === "Aberto"}/>
                            <span>Em Aberto</span>

                            <input type='radio' name='radio' value="Progresso" onChange={handleOptionChance} checked={ status === "Progresso"}/>
                            <span>Progresso</span>

                            <input type='radio' name='radio' value="Atendido" onChange={handleOptionChance} checked={ status === "Atendido"}/>
                            <span>Atendido</span>

                        </div>

                        <label>Complemento</label>
                        <textarea type="text" placeholder='Descreva o problema (Opcional).' value={complemento} onChange={(event) => setComplemento(event.target.value)}/>

                        <button type='submit'>Registrar</button>

                    </form>

                </div>

            </div>

        </div>
    );
}