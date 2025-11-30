import { useState } from "react";
import { Button, Grid, TextField} from '@mui/material';

const TodoAdd = (props) => {
    const [item, setItem] = useState({title:""});
    const addItem = props.addItem;

    const onButtonClick = () => {
        addItem(item);
        setItem({title:""})
    }

    const enterkeyEventHandler = (e) => {
        if(e.key === "Enter"){
            onButtonClick();
        }
    }

    const onInputChange = (e) => {
        setItem({title:e.target.value});
    }

    return (
        <Grid container style={{marginTop:20}}>
            <Grid size={11} item style={{paddingRight:16}}>
                <TextField placeholder="Add Todo here" fullWidth onChange={onInputChange} value={item.title} onKeyDown={enterkeyEventHandler}></TextField>
            </Grid>
            <Grid size={1} item>
                <Button fullWidth style={{height:'100%'}} color="secondary" variant="outlined" onClick={onButtonClick}>+</Button>
            </Grid>
        </Grid>
    )
}

export default TodoAdd;