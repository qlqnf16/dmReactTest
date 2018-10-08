import React, { Component } from 'react';
import { Container, Form, Button } from 'reactstrap';
import InfoForm from '../components/InfoForm/InfoForm';
import { connect } from 'react-redux';
import firebase from '../config/Firebase';

class AddDesigner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.userData.name,
      birthday: this.props.userData.birthday,
      email: this.props.userData.email,
      phoneNumber: this.props.userData.phoneNumber,
      certImg1: null,
      certFile1: null,
      certImg2: null,
      certFile2: null
    };
    // this.onFormSubmit = this.onFormSubmit.bind(this)
    // this.fileUpload = this.fileUpload.bind(this)
  }

  handleImgChange = e => {
    let file = e.target.files[0];
    switch (e.target.name) {
      case 'cert1':
        this.setState({ certImg1: URL.createObjectURL(file) });
        this.setState({ certFile1: file });
        break;
      case 'cert2':
        this.setState({ certImg2: URL.createObjectURL(file) });
        this.setState({ certFile2: file });
        break;
      default:
        console.log('something wrong in [AddDesigner.js]');
    }
    console.log(this.state);
  };

  // onFormSubmit(e){
  //     e.preventDefault() // Stop form submit
  //     this.fileUpload(this.state.file).then((response)=>{
  //     console.log(response.data);
  //     })
  // }

  // fileUpload(file){
  //     const url = 'http://example.com/file-upload';
  //     const formData = new FormData();
  //     formData.append('file',file)
  //     const config = {
  //         headers: {
  //             'content-type': 'multipart/form-data'
  //         }
  //     }
  //     return  post(url, formData,config)
  // }

  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submitHandler = async () => {
    const firebaseUserData = {
      name: this.state.name,
      birthday: this.state.birthday,
      email: this.state.email,
      phoneNumber: this.state.phoneNumber,
      // locations: [
      //   {
      //     region: this.state.region,
      //     shop: this.state.shop,
      //     address: this.state.address
      //   }
      // ],
      untilDesigner: `${this.state.dYear}년 ${this.state.dMonth}개월`,
      career: `${this.state.careerYear}년 ${this.state.careerMonth}개월`,
      careerDetail: this.state.careerDetail
    };
    await firebase
      .database()
      .ref('users/' + this.props.userData.uid)
      .update(firebaseUserData);
    console.log(firebaseUserData);
  };

  render() {
    return (
      <Container>
        <Form className="m-5">
          <InfoForm
            state={this.state}
            certImg1={this.state.certImg1}
            certFile1={this.state.certFile1}
            certImg2={this.state.certImg2}
            certFile2={this.state.certFile2}
            imgChange={e => this.handleImgChange(e)}
            changeInput={e => this.handleInputChange(e)}
          />
          <div className="text-center">
            <Button className="m-5" onClick={this.submitHandler}>
              등록하기
            </Button>
          </div>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(AddDesigner);
