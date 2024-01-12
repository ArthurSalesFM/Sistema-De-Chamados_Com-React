import { useState, createContext, useEffect } from 'react';

export const AuthContext = createContext({});

function AuthProvider({children}){

    const [user, setUser] = useState(null);

    function signIn(email, password){
        alert('Logado Com sucesso.');
    }

    return(
        <AuthContext.Provider value={{
            signed: !!user, //false
            user,
            signIn 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default AuthProvider;