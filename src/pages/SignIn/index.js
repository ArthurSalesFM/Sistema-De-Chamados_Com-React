import './signin.css';
import logo from '../../assets/logo.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function SignIn(){

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    return(
        <div className='container-center'>

            <div className='login'>

                <div className='login-area'>

                    <img 
                    src={logo} 
                    alt='Logo do sistema de chamados'/>

                </div>

                <form>

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
                
                    <button type='submit'>Acessar</button>

                </form>

                <Link to='/register'>Cadastre-se</Link>

            </div>

        </div>

    );
}