import React from "react";
import Button from '@material-ui/core/Button';
import { DropzoneArea } from 'material-ui-dropzone';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import css from './index.module.less'


const header = {
	width: "100%",
	height: "50px",
	backgroundColor: "#20477A"
}

const subtitle = {
	width: "90%",
	height: "5%",
    textAlign: 'left',
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: '2px',
    float: 'left',
    marginTop: '0px',
	marginLeft: '25px',
}

const useStyles = makeStyles((theme) => ({
    '@global': {
      ul: {
        margin: 0,
        padding: 0,
        listStyle: 'none',
      },
    },
    // appBar: {
    //   borderBottom: `1px solid ${theme.palette.divider}`,
    //   backgroundColor:"#224878"
    // },
    // toolbar: {
    //   flexWrap: 'wrap',
    // },
    // toolbarTitle: {
    //   flexGrow: 1,
    // },
    // link: {
    //   margin: theme.spacing(1, 1.5),
    // },
    heroContent: {
      padding: theme.spacing(8, 0, 6),
      margin: "500",
    },
    cardHeader: {
      backgroundColor:"#224878",
      titleTypographyProps:{ align: 'center',color:"#FFFFFF"},
      color:"#FFFFFF",
      
    },
    cardPricing: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'baseline',
      marginBottom: theme.spacing(2),
    },
    footer: {
      borderTop: `1px solid ${theme.palette.divider}`,
      marginTop: theme.spacing(8),
      paddingTop: theme.spacing(3),
      paddingBottom: theme.spacing(3),
      [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
      },
    },
  }));
  


class PageTwo extends React.Component {
    // init data


    constructor(props) {
        super(props);

        this.state = {
            // data that will be used/changed in render function
            files: []
        }
        // Every function that interfaces with UI and data used 
        // in this class needs to bind like this:
        this.handleOnClick = this.handleOnClick.bind(this);
    }

    readFileContent(fileHandler) {
        if(!FileReader) {
            alert('Browser not support FileReader object');
            this.setState({
                Files: []
            });
            return;
        }

        if(!fileHandler.name.toLowerCase().endsWith('.vfg')) {
            alert('Please choose *.vfg file to continue process');
            this.setState({
                Files: []
            });
            return;
        }

        this.setState({
            Files: [fileHandler]
        });

        const reader = new FileReader();
        reader.onload = function fileReadCompleted() {
            // 当读取完成时，内容只在`reader.result`中
            let content = reader.result || '';
            console.log("Content of file: ", content);

            // Save content for page four
            localStorage.setItem('fileContent', content);
        };
        reader.readAsText(fileHandler);
    }

    handleOnClick() {
        this.props.history.push('/')
    }

    handleFileChange(files) {
        console.info("files: ", files);
        const fileHandler = files[0];

        if(fileHandler) {
            this.readFileContent(fileHandler);
        }
    }
    

    render() {
        return (
            <React.Fragment>
              <div style={header}>
                    <h3 style={subtitle}>Build Visualisation From VFG file</h3>
                </div>
            <div>

            <div className={css.buttonBox}>
            <Container maxWidth="sm" component="main" className={useStyles.heroContent}>
            <Typography variant="h4" align="center" color="textPrimary" component="p">
                Select VFG file to generate visualisation directly.
                </Typography>
            </Container>
            </div>


                <Container  maxWidth="sm" component="main">
                <div>
                   
                </div>
                
                <DropzoneArea acceptedFiles={['.vfg']} showAlerts={false} filesLimit={1} fileObjects={this.state.files} onChange={(files) => {this.handleFileChange(files)}}/>
                
                </Container>

                <Container maxWidth="sm" component="main"  marginTop="50">
                <div className={css.buttonBox}>
                <Button variant="contained" color="#224878" onClick={this.handleOnClick} text-align="left">Cancel</Button>
                <Button  variant="contained" color="primary"  startIcon={<CloudUploadIcon />} onClick={()=>{
                    // eslint-disable-next-line no-restricted-globals
                    location.href = '/page4';
                }} text-align="right">Continue</Button>
                </div>
                </Container>
            </div>
            </React.Fragment>
          );
    }
    
  }
  
  export default PageTwo;