import React, { Component } from 'react';
import { Form } from 'reactstrap';
import axios from 'axios';
import fd from 'form-data';
import InfoForm from '../components/InfoForm/InfoForm';
import { connect } from 'react-redux';
import firebase from '../config/Firebase';
import './PageCss.css';

class AddDesigner extends Component {
  constructor(props) {
    super(props);

    let {
      name,
      birthday,
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      addresses
    } = this.props.userData;
    if (!addresses) addresses = [];
    this.state = {
      name,
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      year: birthday && birthday.year,
      month: birthday && birthday.month,
      day: birthday && birthday.day,
      certImg1: null,
      certFile1: null,
      certImg2: null,
      certFile2: null,
      addressNum: addresses.length + 1,
      addresses
    };
  }

  addressAddHandler = () => {
    this.setState({
      addressNum: this.state.addressNum + 1
    });
  };

  addressRemoveHandler = i => {
    let addresses = this.state.addresses;
    addresses.splice(i, 1);
    this.setState({
      addressNum: this.state.addressNum - 1,
      addresses
    });
  };

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
  dYear = 0;
  dMonth = 0;
  careerYear = 0;
  careerMonth = 0;
  handleInputChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    if (target.id === 'dYear' || target.id === 'dMonth') {
      if (target.id === 'dYear') {
        this.dYear = Number(value);
      } else if (target.id === 'dMonth') {
        this.dMonth = Number(value);
      }
      this.setState({ untilDesigner: this.dYear * 12 + this.dMonth });
    } else if (target.id === 'careerYear' || target.id === 'careerMonth') {
      if (target.id === 'careerYear') {
        this.careerYear = Number(value);
      } else if (target.id === 'careerMonth') {
        this.careerMonth = Number(value);
      }
      this.setState({ career: this.careerYear * 12 + this.careerMonth });
    } else if (target.name === 'extraAddress') {
      let addresses = this.state.addresses;
      let address = addresses[target.id];
      addresses[target.id] = { ...address, extraAddress: target.value };
      this.setState({ addresses });
    } else {
      this.setState({ [name]: value });
    }
  }

  handleAddress = (data, fullAddress, num) => {
    const { sido, sigungu } = data;
    const address = { sido, sigungu, fullAddress };
    let addresses = this.state.addresses;
    addresses[num] = address;
    this.setState({ addresses });
  };

  submitHandler = async () => {
    const {
      name,
      year,
      month,
      day,
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      addresses
    } = this.state;

    const firebaseUserData = {
      name,
      birthday: { year, month, day },
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      addresses
    };

    if (
      Object.values(firebaseUserData).includes(undefined) ||
      addresses.length === 0
    )
      return alert('채워지지 않은 정보가 있습니다');
    alert('성공적으로 신청되었습니다');
    await firebase
      .database()
      .ref('users/' + this.props.userData.uid)
      .update(firebaseUserData);

    // TODO: 첨부 안했을때 오류가 나는듯...?
    // const formData = new fd();
    // formData.append('cert_mh', this.state.certFile1);
    // formData.append('cert_jg', this.state.certFile2);
    // await axios.post(
    //   `http://localhost:3030/firebase/upload?uid=${this.props.userData.uid}`,
    //   formData,
    //   {
    //     headers: {
    //       'Content-Type': 'multipart/form-data'
    //     }
    //   }
    // );

    // await this.props.history.push('/designer/whydreamary');
  };

  // TODO : shouldComponentUpdate 로 렌더링 안되게 하기

  render() {
    console.log(this.props.userData);
    return (
      <div className="container-fluid ad">
        <Form className="m-5">
          <div className="ad_title">
            <p
              style={{
                fontWeight: 'normal',
                fontSize: '1.3rem',
                marginBottom: '0.5rem'
              }}
            >
              예비디자이너 등록
            </p>
            드리머리 막내가 되어 <br /> 모델을 구해보세요
          </div>
          <InfoForm
            state={this.state}
            checked={!this.state.gender ? 'male' : this.state.gender}
            certImg1={this.state.certImg1}
            certFile1={this.state.certFile1}
            certImg2={this.state.certImg2}
            certFile2={this.state.certFile2}
            imgChange={e => this.handleImgChange(e)}
            changeInput={e => this.handleInputChange(e)}
            handleAddress={this.handleAddress}
            addressAddHandler={this.addressAddHandler}
            addressRemoveHandler={this.addressRemoveHandler}
          />
          <div className="text-center">
            <div className="ad_button" onClick={this.submitHandler}>
              막내 등록하기
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(AddDesigner);
