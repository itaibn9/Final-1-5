import React, {useEffect, useState} from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function Tickets() {
    const [tickets, setTicket] = useState();

    const classes = useStyles();

    useEffect(()=>{
        (async () => {
          try{
            const { data } = await axios.get('/api/tickets');
            const showedticket = data.map(i => 
              <div key={i.id} className='ticket'>
              <Card className={classes.root}>
        <CardContent>
          <Typography variant="h5" component="h2">
          {i.title}
          </Typography>
          <Typography variant="body2" component="p">
          {i.content}
          </Typography>
        </CardContent>
        <CardActions>
        <span>{i.userEmail}</span><span> | {i.creationTime}</span>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
          </div>
            );
            setTicket(showedticket);
          }catch(error) {
            alert(error);
          }
          })()
      },[])


    return (
      <div>
        {tickets}
      </div>
    )
}

export default Tickets;
