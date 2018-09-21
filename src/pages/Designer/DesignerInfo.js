import React, { Component } from 'react';
import { Container, Form, Button } from 'reactstrap'
import InfoForm from '../../components/InfoForm/InfoForm';
import InfoFormExtended from '../../components/InfoForm/InfoFormExtended'

class DesignerInfo extends Component {
    constructor(props) {
        super(props);
        this.state ={
            profileImg: null,
            profileFile: null,
            certImg1: null,
            certFile1: null,
            certImg2: null,
            certFile2: null,
            portfolioImg: [],
            portfolioFile: [],
            num: 0
        }
        // this.onFormSubmit = this.onFormSubmit.bind(this)
        // this.fileUpload = this.fileUpload.bind(this)
    }

    handleImgChange = (e) => {
        let file = e.target.files[0]
        switch (e.target.name) {
            case('cert1'):
                this.setState({certImg1: URL.createObjectURL(file)});
                this.setState({certFile1: file});
                break;
            case('cert2'):
                this.setState({certImg2: URL.createObjectURL(file)});
                this.setState({certFile2: file});
                break;
            case('profileImg'):
                this.setState({profileImg: URL.createObjectURL(file)});
                this.setState({profileFile: file});
                break;
            case('portfolio'):
                this.state.portfolioImg.push(URL.createObjectURL(file));
                this.state.portfolioFile.push(file)
                this.setState({num: this.state.num + 1})
                break;
            default:
                console.log('something wrong in [DesignerInfo.js]')
        }  
        console.log(this.state)
    }
    
    deletePortfolio = (e) => {
        let foundFile = this.state.portfolioImg.findIndex(url => url === e.target.src);
        this.state.portfolioImg.splice(foundFile, 1);
        this.state.portfolioFile.splice(foundFile, 1);
        this.setState({num: this.state.num - 1})
    }
    
    render(){
        return(
            <Container>
            <Form className="m-5">
                <InfoForm 
                    certImg1 = {this.state.certImg1}
                    certFile1 = {this.state.certFile1}
                    certImg2 = {this.state.certImg2}
                    certFile2 = {this.state.certFile2}
                    imgChange = {e=>this.handleImgChange(e)}
                />
                <InfoFormExtended 
                    profileImg = {this.state.profileImg}
                    profileFile = {this.state.profileFile}
                    portfolioImg = {this.state.portfolioImg}
                    portfolioFile = {this.state.portfolioFile}
                    num = {this.state.num}
                    imgChange = {e=>this.handleImgChange(e)}
                    deletePortfolio = {e=>this.deletePortfolio(e)}
                />
                <div className='text-center'>
                    <Button className='m-5'>Submit</Button>
                </div>
            </Form>
            </Container>
        )
    }
}

export default DesignerInfo