import React from 'react'
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'

const DesginerDetail = () => (
    <div>
        <h1>Designer Detail</h1>
        <Button>
            <Link to="/reservationConfirm">예약하기</Link>
        </Button>
    </div>
)

export default DesginerDetail