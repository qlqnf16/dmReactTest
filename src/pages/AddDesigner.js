import React, { Component } from 'react';
import InfoForm from '../components/AddDesigner/InfoForm';

class AddDesigner extends Component{
    
    render(){
        return(
            <div>
                <div className='m-5 text-center'>
                    <h3>드리머리 막내가 되어 모델을 구해보세요</h3>
                </div>
                <InfoForm />
            </div>
        )
    }
}
    

export default AddDesigner