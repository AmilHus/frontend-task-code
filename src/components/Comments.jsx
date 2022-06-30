import React, { useEffect } from 'react'
import { useNavigate  } from "react-router-dom";
import { useState } from 'react'
import axios from 'axios';
import { commentsList } from '../config/api'
import { Container, Typography } from '@mui/material';
import './pagination.css'
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


const Comments = () => {
    const theme = useContext(ThemeContext);

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const fetchComments = async () => {
        setLoading(true);
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/comments');
        setComments(data);
        setLoading(false);
    }

    useEffect(() => {
      fetchComments()
    },[]);

    const history = useNavigate ();
  return (
    <Container style={{ textAlign: "center" }}>
      <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
        Comments
      </Typography>
      <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "blue" }} />
          ) : (
            <Table aria-label="simple table">
              <TableHead style={{ backgroundColor: "#2583df",}}>
                <TableRow>
                  {["postId", "id", "name", "email", 'body'].map((head) => (
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
                {comments
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
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
                          {row.postId}
                        </TableCell>
                        <TableCell style={theme} align="right">
                          {row.id}
                        </TableCell>
                        <TableCell style={theme} align="right" >
                          {row.name}
                        </TableCell>
                        <TableCell style={theme} align="right" >
                          {row.email}
                        </TableCell>
                        <TableCell style={theme} align="right" >
                          {row.body}
                        </TableCell>
                      </TableRow>
                      
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        
        <Pagination
          count={(comments.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
    </Container>
  )
}

export default Comments