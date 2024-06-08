import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import {jwtDecode} from 'jwt-decode'; // Assurez-vous que l'importation est correcte.

const AuthContext = createContext();

export const useAuth = () => React.useContext(AuthContext);

const Loader = () => (
  <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', fontSize: '24px', color: 'blue' }}>
    Chargement...
  </div>
);

export const AuthProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState();
  const [userToken, setUserToken] = useState(localStorage.getItem('access_token'));
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   console.log("Updated userInfo: ", userInfo); // Ce useEffect affichera userInfo après chaque mise à jour
  // }, [userInfo]); // Écoute les changements de userInfo

  useEffect(() => {
    const refreshToken = async () => {
      setIsLoading(true);
      try {
        const res = await axios.post('http://192.168.1.13:5000/refresh', {
          token: localStorage.getItem('refresh_token')
        });
        const { token, refreshToken } = res.data;
        localStorage.setItem('access_token', token);
        localStorage.setItem('refresh_token', refreshToken);
        setUserToken(token);
        
      } catch (error) {
        console.error('Error refreshing token:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (userToken) {
      const decodedToken = jwtDecode(userToken);
      if (decodedToken.exp * 1000 <= new Date().getTime()) {
        refreshToken();
      }
    }
  }, [userToken]);

  const login = async (email, password) => {
    setIsLoading(true);
    try {
      setIsLoading(false);
      const response = await axios.post('http://192.168.234.176:5000/signin', { email, password });
      const { token, refreshToken } = response.data;
      console.log(response.data)
      setUserInfo(response.data.user); 
      console.log("name",response.data.user.fullname)
      localStorage.setItem('access_token', token);
      localStorage.setItem('refresh_token', refreshToken);
      setUserToken(token);
      // Assurez-vous que la clé 'user' existe dans response.data
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    setUserToken(null);
    setUserInfo(null);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{ userInfo, userToken, isLoading, login, logout }}>
      {isLoading && <Loader />}
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
