import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import "../CSS/Success.css";

const Success = () => {

  const navigate = useNavigate();

  const reDirect = () => {
    navigate('/')
  }

  return (
    <Fragment>
      <div className="success-container">
        <h1 id='payment-success'>Payment Successfully</h1>
        <button onClick={reDirect} style={{ width: '20%' }}>Go To Products</button>
      </div>
    </Fragment>
  )
}

export default Success
