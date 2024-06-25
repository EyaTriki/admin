import React, {  useState  } from 'react';
import { Routes, Route } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "../theme";
import PrivateRoute from './PrivateRoute'; // Assurez-vous que le chemin est correct
import Dashboard from '../scenes/dashboard';
import Team from '../scenes/team';
import Invoices from "../scenes/invoices";
import Contacts from "../scenes/contacts";
import Calendar from "../scenes/calendar/calendar"
import Bar from "../scenes/bar";
import Form from "../scenes/form";
import Line from "../scenes/line";
import Pie from "../scenes/pie";
import FAQ from "../scenes/faq";
import Geography from "../scenes/geography";
import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";
import Login from '../scenes/login/Login';
import { useAuth } from '../context/AuthContext'; 


function AppRoutes() {
  const { userToken } = useAuth(); // Use the useAuth hook here
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  return (
    <ColorModeContext.Provider value={colorMode}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
     
    
          {userToken ? (
           <div className="app">
              <Sidebar isSidebar={isSidebar} />
              <main className="content">
              <Topbar setIsSidebar={setIsSidebar} />
           
              
    <Routes>
     
      <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
      <Route path="/doctors" element={<PrivateRoute><Team /></PrivateRoute>} />
      <Route path="/patients" element={<PrivateRoute><Contacts /></PrivateRoute>} />
      <Route path="/invoices" element={<PrivateRoute><Invoices /></PrivateRoute>} />
      <Route path="/addUser" element={<PrivateRoute><Form /></PrivateRoute>} />
      
      <Route path="/bar" element={<PrivateRoute><Bar /></PrivateRoute>} />
      <Route path="/pie" element={<PrivateRoute><Pie /></PrivateRoute>} />
      <Route path="/line" element={<PrivateRoute><Line /></PrivateRoute>} />
      <Route path="/faq" element={<PrivateRoute><FAQ /></PrivateRoute>} />
      <Route path="/calendar" element={<PrivateRoute><Calendar/></PrivateRoute>}/>
      <Route path="/geography" element={<PrivateRoute><Geography /></PrivateRoute>} />
      
      </Routes>
      </main>
      
      </div>
     
          ) : (
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="*" element={<Login />} />
            </Routes>
          )}
    
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default AppRoutes;
