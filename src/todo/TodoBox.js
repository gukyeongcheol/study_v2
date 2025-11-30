import Todo from './Todo.js';
import TodoAdd from './TodoAdd.js';
import { useState } from 'react';
import {Container, List, Paper} from '@mui/material';
import './TodoBox.css';
import { useEffect } from 'react';
import {sendFetch, sendAxios} from '../common/ApiService.js';

const TodoBox = () =>{
    const [items, setItems] = useState([]);

    useEffect(() => {
        /*
        sendFetch("/todo/srchTodoList","POST",{"userId": "t-user"})
        .then((response) => setItems(response.data));     
        */ 
        sendAxios("/todo/srchTodoList","POST",{"userId": "t-user"})
        .then((response) => setItems(response.data));
    },[]);
    

    const addItem = (item) => {
        /*
        sendFetch("/todo/addTodo","POST",item)
        .then((response) => setItems(response.data));    
        */   
       sendAxios("/todo/addTodo","POST",item)
        .then((response) => setItems(response.data));           
    }

    const delItem = (item) => {
        /*
        sendFetch("/todo/delTodo","DELETE",item)
        .then((response) => setItems(response.data));     
        */   
       sendAxios("/todo/delTodo","DELETE",item)
        .then((response) => setItems(response.data));   
    }

    const editItem = (item) => {
        /*
        sendFetch("/todo/modTodo","PUT",item)
        .then((response) => setItems(response.data)); 
        */ 
       sendAxios("/todo/modTodo","PUT",item)
        .then((response) => setItems(response.data));        
    }    

    let todoItems = items.length > 0 && (
        <Paper style={{margin:16}}>
            <List>
                {items.map((item) => (
                    <Todo item={item} key={item.id} delItem={delItem} editItem={editItem}></Todo>
                ))}
            </List>
        </Paper>
    );

    

    return (              
        <div className='App'>
            <Container maxWidth="md">
                <TodoAdd addItem={addItem}></TodoAdd>
                <div className='TodoList'>{todoItems}</div>
            </Container>
        </div>
    )
}

export default TodoBox;