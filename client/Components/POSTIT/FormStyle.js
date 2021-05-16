import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
    },
  },
  paper: {
    marginTop: '130px',
    padding: theme.spacing(2),
    paddingLeft: '120px',
  },
  form: {
    width: '55%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  fileInput: {
    width: '97%',
    margin: '10px 0',
  },
  grpRadioBttn: {
    width: '97%',
    margin: '10px 0',
  },
  radioBttn: {
    display: 'inline',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },

  buttonSubmit: {
    marginBottom: 10,
  },
}));