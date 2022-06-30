import React, { useEffect } from 'react'
import { useNavigate  } from "react-router-dom";
import { useState } from 'react'
import axios from 'axios';
import { PostsList } from '../config/api'
import { Container, Typography } from '@mui/material';
import {
  createTheme,
  TableCell,
  LinearProgress,
  ThemeProvider,
  TextField,
  TableBody,
  TableRow,
  TableHead,
  TableContainer,
  Table,
  Paper,
} from "@material-ui/core";
import Pagination from "@material-ui/lab/Pagination";
import ThemeContext,{themes} from '../config/Theme'
import { useContext } from 'react';

const Users = () => {
    const theme = useContext(ThemeContext);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const fetchUsers = async () => {
        setLoading(true);
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(data);
        setLoading(false);
    }

    useEffect(() => {
      fetchUsers()
    },[]);

    const history = useNavigate ();
  return (
    <Container style={{ textAlign: "center" }}>
      <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
        Users
      </Typography>
      <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "blue" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#2583df",}}>
                <TableRow>
                  {["id", "name","username", "email", "address","phone","website","company"].map((head) => (
                    <TableCell
                    style={theme}
                      key={head}
                      align='right'
                    >
                      {head}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>

              <TableBody>
                {users
                .map((row) => {
                    return (
                      <TableRow
                        className='row'
                        
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          style={theme}
                        >
                          {row.id}
                        </TableCell>
                        <TableCell style={theme} align="right">
                          {row.name}
                        </TableCell>
                        <TableCell style={theme} align="right" >
                          {row.username}
                        </TableCell>
                        <TableCell style={theme} align="right" >
                          {row.email}
                        </TableCell>
                        <TableCell style={theme} align="right" >
                          {row.address.street}
                          {row.address.suite}
                          {row.address.city}
                          {row.address.zipcode}
                          {row.address.geo.lat}
                          {row.address.geo.lng}
                        </TableCell>
                        <TableCell style={theme} align="right" >
                          {row.phone}
                        </TableCell>
                        <TableCell style={theme} align="right" >
                          {row.email}
                        </TableCell>
                        <TableCell style={theme} align="right" >
                          {row.company.name}
                          {row.company.catchPhrase}
                          {row.company.bs}
                        </TableCell>
                      </TableRow>
                      
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        
    </Container>
  )
}

export default Users