import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import firebase from 'firebase'
import axios from "axios";

import DetailContent from '../components/DesignerDetail/DetailContent'
import DetailFilter from '../components/DesignerDetail/DetailFilter'
import MyModal from '../components/UI/MyModal/MyModal'

class DesginerDetail extends Component {
    state = {
        recruit: {},
        showLogin: false,
        LoginChange: false,
        madeRequest: false
    }

    componentDidMount = async () => {
        // DB에서 정보받아와서 넣어주는 곳
        console.log(firebase.auth().currentUser);
        console.log(this.props);
        if(!this.state.madeRequest) {
            const {data} = await axios.get(`http://localhost:3030/recruits/${this.props.match.params.id}`);
            this.setState({recruit: data, madeRequest: true});
        }
        firebase.auth().onAuthStateChanged(() => {
            this.offHandler();
            this.setState({
                ...this.state,
                LoginChange : !this.state.LoginChange,
            })
        })
    }
    

    loginToggleHandler = () => {
        this.setState({showLogin: !this.state.showLogin})
    }
    offHandler = () => {
        this.setState({showSignUp: false, showLogin: false})
    }


    render() {
        console.log(this.state);
        let loading = null;
        if(Object.keys(this.state.recruit).length) {
            loading = (
                <div className="row">
                    <DetailContent 
                        introduce={this.state.recruit.introduction}
                        data={this.state.recruit.requirement}
                        reviews={[{}]}
                    />
                    <DetailFilter
                        time={this.state.recruit.ableDates}
                    />
                </div>
            )
        }
        return(
            <div>
                <div className='container'>
                    <h1 className="text-center m-5 ">2단계 : 예약하기(이미지로)</h1>
                    {loading}
                    {
                        firebase.auth().currentUser ?
                        <Button className="btn-light float-right"><Link to={`/reservationConfirm/${"예약번호"}`}>예약하기</Link></Button> :
                        <Button onClick={this.loginToggleHandler} className="btn-light float-right">예약하기</Button> 
                    }
                </div>
                <MyModal 
                    showLogin={this.state.showLogin} 
                    off={this.loginToggleHandler}
                    type="login"
                />
            </div>
        )
    }
}

export default DesginerDetail