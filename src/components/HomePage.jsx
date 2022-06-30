import { Paper } from '@material-ui/core'
import React from 'react'
import ThemeContext,{themes} from '../config/Theme'
import { useContext } from 'react';
import Posts from './Posts';

const HomePage = () => {
  const theme = useContext(ThemeContext);

  return (
    <Posts />
  )
}

export default HomePage