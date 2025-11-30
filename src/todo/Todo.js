import { useState } from "react";
import {ListItem, InputBase, Checkbox, IconButton, Box} from '@mui/material';
import DeleteOutlined from '@mui/icons-material/DeleteOutlined'


const Todo = (props) =>{
    const [item, setItem] = useState(props.item);
    const [readOnly, setReadOnly] = useState(true); // 목록 수정가능상태/수정불가능상태 만들기
    const delItem = props.delItem;
    const editItem = props.editItem;

    // 목록 삭제
    const delEventHandler = () => {
        delItem(item)
    }

    // 목록 수정
    const editEventHandler = (e) => {
        setItem({...item, title:e.target.value});
    }

    // 목록 체크
    const checkboxEventHandler = (e) => {
        item.done = e.target.checked;
        editItem(item);
    }

    // 목록 수정가능상태 만들기
    const turnOffReadOnly = () => {
        setReadOnly(false);
    }

    // 목록 수정불가능상태 만들기
    const turnOnReadOnly = (e) => {
        if(e.key === "Enter" && readOnly === false){
            setReadOnly(true);
            editItem(item);
        }        
    }

    return (      
        <ListItem>
            <Box sx={{
                display:'flex',
                alignItems:'center',
                width:'100%'
            }}>
                <Checkbox checked={item.done} onChange={checkboxEventHandler}></Checkbox>               
                <InputBase
                    inputProps={{"aria-label":"naked", readOnly:readOnly}}
                    onClick={turnOffReadOnly}
                    onKeyDown={turnOnReadOnly}
                    onChange={editEventHandler}
                    type="text"
                    id={item.id}
                    name={item.name}
                    value={item.title}
                    multiline={true}
                    fullWidth={true}
                    sx={{ml:1}}
                ></InputBase>
                <IconButton edge="end" aria-label='Delete Todo' onClick={delEventHandler} sx={{mr:0.5}}><DeleteOutlined></DeleteOutlined></IconButton>               
            </Box>            
        </ListItem>
    )
}

export default Todo;