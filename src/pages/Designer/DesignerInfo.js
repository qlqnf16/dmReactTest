import React, { Component } from 'react';
import { Form } from 'reactstrap';
import InfoForm from '../../components/InfoForm/InfoForm';
import InfoFormExtended from '../../components/InfoForm/InfoFormExtended';
import { connect } from 'react-redux';
import firebase from '../../config/Firebase';

class DesignerInfo extends Component {
  constructor(props) {
    super(props);

    const userData = this.props.userData;
    this.state = {
      name: userData.name,
      year: userData.birthday.year,
      month: userData.birthday.month,
      day: userData.birthday.day,
      email: userData.email,
      phoneNumber: userData.phoneNumber,
      untilDesigner: userData.untilDesigner,
      career: userData.career,
      careerDetail: userData.careerDetail,
      profileImg: null,
      profileFile: null,
      certImg1: null,
      certFile1: null,
      certImg2: null,
      certFile2: null,
      portfolioImg: [],
      portfolioFile: [],
      num: 0
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
      case 'profileImg':
        this.setState({ profileImg: URL.createObjectURL(file) });
        this.setState({ profileFile: file });
        break;
      case 'portfolio':
        this.state.portfolioImg.push(URL.createObjectURL(file));
        this.state.portfolioFile.push(file);
        this.setState({ num: this.state.num + 1 });
        break;
      default:
        console.log('something wrong in [DesignerInfo.js]');
    }
    console.log(this.state);
  };

  deletePortfolio = e => {
    let foundFile = this.state.portfolioImg.findIndex(
      url => url === e.target.src
    );
    this.state.portfolioImg.splice(foundFile, 1);
    this.state.portfolioFile.splice(foundFile, 1);
    this.setState({ num: this.state.num - 1 });
  };
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
    } else {
      this.setState({ [name]: value });
    }
  }

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
      introduce
    } = this.state;

    const firebaseUserData = {
      name,
      birthday: { year, month, day },
      email,
      phoneNumber,
      untilDesigner,
      career,
      careerDetail,
      introduce
    };

    if (Object.values(firebaseUserData).includes(undefined))
      return alert('채워지지 않은 정보가 있습니다');
    await firebase
      .database()
      .ref('users/' + this.props.userData.uid)
      .update(firebaseUserData);
    alert('성공적으로 신청되었습니다');
  };

  render() {
    return (
      <div className="container-fluid d">
        <div className="d_bg">
          <div className="d_container">
            <div style={{ color: '#4c91ba' }} className="u_title ">
              회원정보 수정
            </div>
            <Form className="m-5 d_info">
              <InfoForm
                state={this.state}
                certImg1={this.state.certImg1}
                certFile1={this.state.certFile1}
                certImg2={this.state.certImg2}
                certFile2={this.state.certFile2}
                imgChange={e => this.handleImgChange(e)}
                changeInput={e => this.handleInputChange(e)}
                checked={!this.state.gender ? 'male' : this.state.gender}
              />
              <InfoFormExtended
                state={this.state}
                profileImg={this.state.profileImg}
                profileFile={this.state.profileFile}
                portfolioImg={this.state.portfolioImg}
                portfolioFile={this.state.portfolioFile}
                num={this.state.num}
                imgChange={e => this.handleImgChange(e)}
                deletePortfolio={e => this.deletePortfolio(e)}
                changeInput={e => this.handleInputChange(e)}
              />
              <div className="text-center">
                <div className="btn dif_button" onClick={this.submitHandler}>
                  등록하기
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication: { userData } }) => {
  return { userData };
};
export default connect(mapStateToProps)(DesignerInfo);
