import {createContext, useState, useEffect} from 'react';


export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({children}) => {

  const [signUpCode, setSignUpCode] = useState(null);
  const [signUpData, setSignUpData] = useState(null);
  const [authData, setAuthData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const data = localStorage.getItem('familyShareAuthData')

  useEffect(() => {
    if (data) {
      setAuthData(JSON.parse(data))
      setIsLoading(false);
    } else {
      setAuthData(null);
      setIsLoading(false);
    }
  }, [data]);

  return (
    <AuthContext.Provider value={{authData, isLoading, setAuthData, signUpData, setSignUpData, signUpCode, setSignUpCode}}>
      {children}
    </AuthContext.Provider>
  )
}
