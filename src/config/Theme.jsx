import React, { useState } from "react"

export const themes = {
    dark:{
        color:'white',
        background:'black',
    },
    light:{
        color:'white',
        background:'#2583df',
    }
}



const ThemeContext = React.createContext(themes)

export default ThemeContext;