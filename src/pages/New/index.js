import './new.css';
import Title from '../../components/Title';
import Header from '../../components/Header';
import { FiPlusCircle } from 'react-icons/fi';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/auth';
import { db } from '../../services/firebaseConnection';
import { collection, getDoc, getDocs, doc, addDoc, updateDoc  } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';

const listRef = collection(db, 'customers');

export default function New(){

    const { user } = useContext(AuthContext);
    const [customers, setCustomers] = useState({});
    const [complemento, setComplemento] = useState('');
    const [assunto, setAssunto] = useState('Suporte');
    const [status, setStatus] = useState('Aberto');
    const [loadCustomer, setLoadCustomer] = useState(true);
    const [customerSelected, setCustomerSelected] = useState(0);
    const { id } = useParams();
    const [idCustomer, setIdCustomer] = useState(false);
    const navigate = useNavigate();

    useEffect(() =>{

        async function loadCustomer(){
            const querySnapshot = await getDocs(listRef)
            .then((snapshot) =>{
                let list = [];
                snapshot.forEach((doc) => {
                    list.push({
                        id: doc.id,
                        nomeFantasia: doc.data().nomeFantasia
                    });
                })
                
                if(snapshot.docs.size === 0){
                    setCustomers([{ id: 1, nomeFantasia: 'Teste'}]);
                    setLoadCustomer(false);
                    return;
                }

                setCustomers(list);
                setLoadCustomer(false);

                if(id){
                    loadId(list);
                }

            })
            .catch((error) =>{
                setLoadCustomer(false);
                setCustomers([{ id: 1, nomeFantasia: 'Teste'}]);
            })
        }

        loadCustomer();

    }, [id]);

    async function loadId(lista){
        const docRef = doc(db, 'chamados', id);
        await getDoc(docRef)
        .then((snapshot) => {
            setAssunto(snapshot.data().assunto);
            setStatus(snapshot.data().status);
            setComplemento(snapshot.data().complemento);

            let index = lista.findIndex(item => item.id === snapshot.data().clienteId);
            setCustomerSelected(index);
            setIdCustomer(true);

        })
        .catch((error) => {
            toast.error('Chamado não encontrado!');
            setIdCustomer(false);
        })
    }

    function handleOptionChance(event){
        setStatus(event.target.value);
    }

    function handleChangeSelect(event){
        setAssunto(event.target.value);
    }

    function handleChangeCustomer(event){
        setCustomerSelected(event.target.value);
    }

    async function handleRegister(event){

        event.preventDefault();

        if(idCustomer){
            //Atulizando os chamados
            const docRef = doc(db, 'chamados', id);
            await updateDoc(docRef, {
                cliente: customers[customerSelected].nomeFantasia,
                clienteId: customers[customerSelected].id,
                assunto: assunto,
                complemento: complemento,
                status: status,
                userId: user.uid,
            })
            .then(() =>{
                toast.info('Informações atualizadas com Sucesso.');
                setCustomerSelected(0);
                setComplemento('');
                navigate('/dashboard');
            })
            .catch(() => {
                toast.error('Erro na atualização das informações.');
            })
            return;
        }

        await addDoc(collection(db, "chamados"), {
            created: new Date(),
            cliente: customers[customerSelected].nomeFantasia,
            clienteId: customers[customerSelected].id,
            assunto: assunto,
            complemento: complemento,
            status: status,
            userId: user.uid,
        })
        .then(() =>{
            setComplemento('');
            setCustomerSelected(0);
            toast.success('Chamado registrado com Sucesso');
        })
        .catch(() =>{
            toast.error('Não foi possível registrar o chamado.\nTente Novamente depois.');
        })
    }

    return(
        <div>

            <Header/>

            <div className='content'>

                <Title name={id ? "Editando Chamado" : "Novo Chamado"}>
                    <FiPlusCircle size={25}/>
                </Title>

                <div className='container'>

                    <form className='form-profile' onSubmit={handleRegister}>

                        <label>Clientes</label>
                        {
                            loadCustomer ? (
                                <input type='text' disabled={true} value="Carregando..."/>
                            ) : (
                                <select value={customerSelected} onChange={handleChangeCustomer}>
                                    {customers.map((item, index) =>{
                                        return(
                                            <option key={index} value={index}>
                                                {item.nomeFantasia}
                                            </option>
                                        )
                                    })}
                                </select>
                            )
                        }

                        <label>Assunto</label>
                        <select value={assunto} onChange={handleChangeSelect}>
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