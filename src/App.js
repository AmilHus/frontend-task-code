import { makeStyles  } from "@material-ui/core";
import Paper from '@mui/material/Paper';
import './App.css';
import {BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { HomePage,Menu,Posts,Users,Comments } from './components';
import { ThemeProvider, createTheme,styled, useTheme } from '@mui/material/styles';
import { light } from "@material-ui/core/styles/createPalette";
import React, { useContext } from "react";
import { ToggleColorMode } from "./components/Menu";
import { withTheme } from "./config/Theme";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import useMediaQuery from "@material-ui/core/useMediaQuery";
import ThemeContext,{themes} from './config/Theme'
import { useState } from "react";
import {MaterialUISwitch} from './components/Menu'


function App() {
  const [theme, setTheme] = useState(themes.light)

  const toggleTheme = () => {
    theme == themes.light ? setTheme(themes.dark) : setTheme(themes.light);
  };
  return (
    <ThemeContext.Provider value={theme}>
      <div className='App' style={theme}>
        <div className="navbar">
          <Menu />
          <FormGroup style={{
            position:'absolute',
            transform:'translate(100px,-55px)'
        
        }}>
                <FormControlLabel  
                    control={<MaterialUISwitch onClick={toggleTheme} sx={{ m: 1 }} 
                    />}
                />
          </FormGroup>
        </div>
        <div className="routes">
          <Routes>
            <Route path="/" element={<HomePage/>} exact />
            <Route  path="/posts" element={<Posts/>} />
            <Route  path="/comments" element={<Comments/>} />
            <Route  path="/users" element={<Users/>} />
          </Routes>
        </div>
      </div>
      </ThemeContext.Provider>
  );
}

export default App;
