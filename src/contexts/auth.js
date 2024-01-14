import { useState, createContext, useEffect } from 'react';
import { auth, db} from '../services/firebaseConnection';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {doc, getDoc, setDoc} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const AuthContext = createContext({});

function AuthProvider({children}){

    const [user, setUser] = useState(null);
    const [loadingAuth, setLoadingAuth] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    
    useEffect(() =>{
        async function loadUser(){
            const storageUser = localStorage.getItem("@ticketsPRO");

            if(storageUser){
                setUser(JSON.parse(storageUser));
                setLoading(false);
            }

            setLoading(false);
        }

        loadUser();
    }, []);

    async function signIn(email, password){ 
        setLoadingAuth(true);
        await signInWithEmailAndPassword(auth, email, password)
        .then( async (value) => {
            let uid = value.user.uid;
            const docRef = doc(db, 'users', uid);
            const docSnap = await getDoc(docRef);
            let data = {
                uid: uid,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl,
            }

            setUser(data);
            storageUser(data);
            setLoadingAuth(false);
            toast.success(`Bem-vindo(a), ${data.nome}!`);
            navigate('/dashboard');
        })
        .catch(() => {
            toast.error('Ops, algo deu errado.');
            setLoadingAuth(false);
        })       
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

    async function logout(){
        await signOut(auth);
        localStorage.removeItem('@ticketsPRO');
        setUser(null);
        toast.warn('Você saiu do Sistema.');
    }

    return(
        <AuthContext.Provider value={{
            signed: !!user, //false
            user,
            signIn,
            signUp,
            logout,
            loadingAuth,
            loading,
            storageUser,
            setUser
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;