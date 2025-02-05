import './App.css';
import React from 'react';
import { db } from './services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import AppRoutes from './routes/Routes';
import { ThemeProvider } from 'styled-components';
import { useTheme } from './contexts/ThemeContext';

function App() {
  const { colors } = useTheme();
  React.useEffect(() => {
    async function getRoles() {
      try {
        const rolesCol = collection(db, 'users');
        const rolesSnapshot = await getDocs(rolesCol);
        const rolesList = rolesSnapshot.docs.map((doc) => {
          return doc.data();
        });
        return rolesList;
      } catch (e) {
        console.error(e);
        return [];
      }
    }
    getRoles().then((roles) => {
      console.log(roles);
    });
  }, []);

  return (
    <>
      <ThemeProvider theme={{ colors }}>
        <AppRoutes />
      </ThemeProvider>
    </>
  );
}

export default App;
