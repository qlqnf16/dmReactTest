import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'
import firebase from 'firebase'

import DetailContent from '../components/DesignerDetail/DetailContent'
import DetailFilter from '../components/DesignerDetail/DetailFilter'
import MyModal from '../components/UI/MyModal/MyModal'

class DesginerDetail extends Component {
    state = {
        introduce : "",
        data : "",
        time : "",
        review : [],
        showLogin: false,
        LoginChange: false,
    }

    componentWillMount = () => {
        // DB에서 정보받아와서 넣어주는 곳
        console.log(firebase.auth().currentUser)
        const userData = {
            introduce : "안녕하세요 오상우 입니다",
            data : "경력과 이력을 쏼라쏼라",
            time : "되는 시간대들",
            reviews : [
                {
                    name: "신한결",
                    star : 1,
                    date: "9/18",
                    content: "너무 못 자르시네요"
                },
                {
                    name: "이정민",
                    star : 5,
                    date: "9/17",
                    content: "최고에요!"
                }
                
            ]
        }
        this.setState(userData)
        firebase.auth().onAuthStateChanged(() => {
            this.offHandler()
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
        return(
            <div>
                <div className='container'>
                    <h1 className="text-center m-5 ">2단계 : 예약하기(이미지로)</h1>
                    <div className="row">
                        <DetailContent 
                            introduce={this.state.introduce} 
                            data={this.state.data}
                            reviews={this.state.reviews}
                        />
                        <DetailFilter
                            time={this.state.time}
                        />
                    </div>
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