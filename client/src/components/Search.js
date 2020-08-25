import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '.././styling/Search.css';
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch'
    },
  },
}));
function Search({onchange}) {
    const classes = useStyles();

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField id="searchInput" label="Filter list" variant="outlined"
             onChange={event => onchange(event.target.value)}/>
        </form>
    )
}


export default Search

