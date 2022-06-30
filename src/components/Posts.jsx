import React, { useEffect } from 'react'
import { useNavigate  } from "react-router-dom";
import { useState } from 'react'
import axios from 'axios';
import { PostsList } from '../config/api'
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Comments from './Comments';


const Posts = () => {
  const theme = useContext(ThemeContext);
    const [active, setActive] = useState(false)
    const [open, setOpen] = useState(false)
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [number, setNumber] = useState();
    const [comments, setComments] = useState([]);
    const fetchComments = async () => {
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/comments');
        setComments(data);
    }

    useEffect(() => {
      fetchComments()
    },[]);

    const handleClickOp = () => {
      setOpen(true);
    };
    
    const handleClickOpen = () => {
      setActive(true);
    };

    const handleClose = () => {
      setActive(false);
    };

    const handleCl = () => {
      setOpen(false);
    };

    const fetchPosts = async () => {
        setLoading(true);
        const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
        setPosts(data);
        setLoading(false);
    }

    useEffect(() => {
      fetchPosts()
    },[]);

      function Popup(e) {
        setNumber(e)        
        handleClickOpen()
      }
      function PopupComments(e) {
        setNumber(e)        
        handleClickOp()
      }
    const history = useNavigate ();
  return (
    
    <Container style={{ textAlign: "center" }}>
      <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
        Posts
      </Typography>
      <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress  />
          ) : (
            <Table aria-label="simple table">
              <TableHead >
                <TableRow>
                  {["userId", "id", "title", "body"].map((head) => (
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
                {posts
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .map((row) => {
                    return (
                      <TableRow
                        className='row'
                        style={theme}
                      >
                        <TableCell style={theme}
                          component="th"
                          scope="row"
                          onClick={() => Popup(row.userId)}
                        >
                          {row.userId}
                        </TableCell>
                        <TableCell onClick={() => PopupComments(row.id)} style={theme} align="right">
                          {row.id}
                        </TableCell>
                        <TableCell style={theme} align="right" >
                          {row.title}
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
          count={(posts.length / 10).toFixed(0)}
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
        <Dialog
      
        open={active}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress  />
          ) : (
            <Table aria-label="simple table">
              <TableHead >
                <TableRow>
                  {["userId", "id", "title", "body"].map((head) => (
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
                {posts
                .slice((page - 1) * 10, (page - 1) * 10 + 10)
                .filter((e) => {return e.userId == number}).map((e) => {
                    return (
                      <TableRow
                        className='row'
                        style={theme}
                      >
                        <TableCell style={theme}
                          component="th"
                          scope="row"
                        >
                          {e.userId}
                        </TableCell>
                        <TableCell style={theme} align="right">
                          {e.id}
                        </TableCell>
                        <TableCell style={theme} align="right" >
                          {e.title}
                        </TableCell>
                        <TableCell style={theme} align="right" >
                          {e.body}
                        </TableCell>
                      </TableRow>
                      
                    );
                  })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
      
        open={open}
        onClose={handleCl}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
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
                .filter((e) =>{return e.postId = number}).map((row) => {
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCl } autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
    
  )
}

export default Posts