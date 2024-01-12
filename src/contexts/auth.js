import { useState, createContext, useEffect } from 'react';
import { auth, db} from '../services/firebaseConnection';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const navigate = useNavigate();

    function signIn(email, password){        
        alert('Logado Com sucesso.');
    }

    //Cadastrar um novo usuário
    async function signUp(email, password, name){
        setLoadingAuth(true);

        await createUserWithEmailAndPassword(auth, email, password)
        .then( async(value) => {
            let uid = value.user.uid
            await setDoc(doc(db, 'users', uid), {
                nome: name,
                avatar: null
            })
            .then(() => {
                let data = {
                    uid: uid,
                    nome: name,
                    email: value.user.email,
                    avatarUrl: null                
                };
                setUser(data);
                storageUser(data);
                setLoadingAuth(false);
                toast.success('Cadastrado com Sucesso.');
                navigate("/");                
            })
        })
        .catch((error) => {
            toast.error('Erro ao cadastrar!\nVerifique os dados ou tente novamente mais tarde.');
        })
        
    }

    function storageUser(data){
        localStorage.setItem('@ticketsPRO', JSON.stringify(data));
    }

    return(
        <AuthContext.Provider value={{
            signed: !!user, //false
            user,
            signIn,
            signUp,
            loadingAuth 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;