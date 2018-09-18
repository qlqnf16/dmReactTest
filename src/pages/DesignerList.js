import React, { Component } from 'react';
import DesignerCard from '../components/DesignerCard/DesignerCard'
import { Container, CardDeck } from 'reactstrap'

class DesignerList extends Component{
    state = {
        designers: [
            {
                title: '제목',
                name: '이정민',
                shop: '차홍아르더/청담동',
                test: [
                    'https://picsum.photos/300/200/?image=2',
                    'https://picsum.photos/300/200/?image=5',
                    'https://picsum.photos/300/200/?image=8'
                ]
            },
            {
                title: '제목2',
                name: '이정민',
                shop: '차홍아르더/청담동',
                test: [
                    'https://picsum.photos/300/200/?image=5',
                    'https://picsum.photos/300/200/?image=7'
                ]
            },
            {
                title: '제목3',
                name: '이정민',
                shop: '차홍아르더/청담동',
                test: 'https://picsum.photos/300/200/?image=4'
            },
            {
                title: '제목4',
                name: '이정민',
                shop: '차홍아르더/청담동',
                test: 'https://picsum.photos/300/200/?image=4'
            },
            {
                title: '제목5',
                name: '이정민',
                shop: '차홍아르더/청담동',
                test: 'https://picsum.photos/300/200/?image=4'
            }
        ]
    }

    render(){

        return(
            <div className="container">
                <div className="m-5 text-center">
                    <h1>1단계 : 막내 찾기(이미지)</h1>
                </div>
                <div className="m-5 text-center">
                    <h1>filter</h1>
                </div>
                <CardDeck className="m-5">
                    {
                        this.state.designers.map((designer,key) => (
                            <DesignerCard 
                                title={designer.title}
                                name={designer.name}
                                shop={designer.shop}
                                test={designer.test}
                                key={key}
                            />
                        ))
                    }
                </CardDeck>
            </div>
        )
    }
;
}

export default DesignerList;