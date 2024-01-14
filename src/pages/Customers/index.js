import Header from '../../components/Header';
import Title from '../../components/Title';
import { FiUser } from 'react-icons/fi';
import { useState } from 'react';
import { db } from '../../services/firebaseConnection';
import { addDoc, collection } from 'firebase/firestore';
import { toast } from 'react-toastify';

export default function Customers(){

    const [nome, setNome] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [endenreco, setEndereco] = useState('');

    async function handleRegister(event){
        event.preventDefault();

        if(nome !== "" && cnpj !== "" && endenreco !== ""){
            await addDoc(collection(db, "customers"), {
                nomeFantasia: nome,
                cnpj: cnpj,
                endenreco: endenreco,
            })
            .then(() => {
                setNome('');
                setCnpj('');
                setEndereco('');
                toast.success('Empresa cadastrada com Sucesso!');
            })
            .catch(() => {
                toast.error('Ops, Ocorreu algum problema para cadastrar a empresa.\nTente novamente mais tarde.')
            });            
        }
        else{
            toast.error('Preencha todos os campos.');
        }
    }

    return(
        <div>
            <Header/>

            <div className='content'>
                
                <Title name="Clientes">
                    <FiUser size={25}/>
                </Title>

                <div className='container'>

                    <form className='form-profile' onSubmit={handleRegister}>

                        <label>Nome Fantasia</label>
                        <input type='text' placeholder='Nome da empresa' value={nome} onChange={(event) => setNome(event.target.value)}/>

                        <label>CNPJ</label>
                        <input type='text' placeholder='Cnpj da empresa' value={cnpj} onChange={(event) => setCnpj(event.target.value)}/>

                        <label>Endereço</label>
                        <input type='text' placeholder='Endereço da empresa' value={endenreco} onChange={(event) => setEndereco(event.target.value)}/>

                        <button type='submit'>Salvar</button>

                    </form>

                </div>

            </div>

        </div>
    );
}