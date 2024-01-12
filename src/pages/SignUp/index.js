//import './signin.css';
import logo from '../../assets/logo.png';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

export default function SignUp(){

    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [confirmaSenha, setConfirmaSenha] = useState('');

    const { signUp, loadingAuth } = useContext(AuthContext);

    async function handleSubmit(event){
        event.preventDefault();

        if(nome === '' || email === '' || senha === '' || confirmaSenha === ''){
            toast.warning('Preencha todos os campos.');
            return;
        }

        if(senha !== confirmaSenha){
            toast.error('As senhas não são iguais.');
            return;
        }
        
        await signUp(email, senha, nome);
        
    }

    return(
        <div className='container-center'>

            <div className='login'>

                <div className='login-area'>

                    <img 
                    src={logo} 
                    alt='Logo do sistema de chamados'/>

                </div>

                <form onSubmit={handleSubmit}>

                    <h1>Nova Conta</h1>

                    <input 
                    type='text' 
                    placeholder='Digite seu Nome...' 
                    value={nome} 
                    onChange={(event) => setNome(event.target.value)}/>

                    <input 
                    type='email' 
                    placeholder='Digite seu Email...' 
                    value={email} 
                    onChange={(event) => setEmail(event.target.value)}/>
                    
                    <input 
                    type='password' 
                    placeholder='Digite sua Senha...' 
                    value={senha} 
                    onChange={(event) => setSenha(event.target.value)}/>

                    <input 
                    type='password' 
                    placeholder='Confirme sua Senha...' 
                    value={confirmaSenha} 
                    onChange={(event) => setConfirmaSenha(event.target.value)}/>
                
                    <button type='submit'>
                        {loadingAuth ? 'Cadastrando...' : 'Cadastrar'}
                    </button>

                </form>

                <span>Já possui uma conta? <Link to='/'>Faça login</Link></span>

            </div>

        </div>

    );
}