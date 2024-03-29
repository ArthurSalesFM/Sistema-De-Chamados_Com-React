import './signin.css';
import logo from '../../assets/logo.png';
import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/auth';
import { toast } from 'react-toastify';

export default function SignIn(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const { signIn, loadingAuth } = useContext(AuthContext);

    async function handleSignIn(event){
        event.preventDefault();

        if(senha === "" || email === ""){
            toast.warning('Preencha todos os campos para logar.');
            return;
        }

        await signIn(email, senha);
    }

    return(
        <div className='container-center'>

            <div className='login'>

                <div className='login-area'>

                    <img 
                    src={logo} 
                    alt='Logo do sistema de chamados'/>

                </div>

                <form onSubmit={handleSignIn}>

                    <h1>Entrar</h1>

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
                
                    <button type='submit'>
                        {loadingAuth ? 'Carregando...' : 'Acessar'}
                    </button>

                </form>

                <span>Não tem cadastro? <Link to='/register'>Cadastre-se</Link></span>
                
            </div>

        </div>

    );
}