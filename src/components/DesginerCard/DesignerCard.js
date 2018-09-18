import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { CardDeck, Col, Card, CardHeader, CardBody, CardTitle, CardSubtitle } from 'reactstrap';
import DesignerCarousel from './DesignerCarousel/DesignerCarousel';

class DesginerCard extends Component {
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

    render() {
        let designers = []
        this.state.designers.forEach((designer, key)=>{
            designers.push(
                <Col key={key} xs="3">
                    <Card>
                        <CardHeader>
                            <DesignerCarousel test={designer.test} />
                        </CardHeader>
                        <CardBody>
                            <CardSubtitle>{designer.shop}</CardSubtitle>
                            <CardTitle>{designer.title}</CardTitle>
                            <CardSubtitle>{designer.name}</CardSubtitle>
                        </CardBody>
                    </Card>
                </Col>
            )
        })

        return(
            <div>
                <CardDeck>
                    {designers}
                </CardDeck>
            </div>
        )
    }
}

export default DesginerCard