import React, { Component } from 'react';
import InfoForm from '../../components/AddDesigner/InfoForm'

class DesignerInfo extends Component {
    
    render(){
        return(
            <div>
                <div className='m-5 text-center'>
                    <h3>회원정보 관리</h3>
                </div>
                <InfoForm />
            </div>
        )
    }
}

export default DesignerInfo