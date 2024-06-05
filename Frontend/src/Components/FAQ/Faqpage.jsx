import React, { useState } from 'react'

const Faqpage = ({question, answer}) => {
    const [show, setShow] = useState(false);
  return (
    <div className='main-faq'>
        <div className='main-heading' onClick={() => setShow(!show)}>
            <p>
                {show ? "➖" : "➕"}
            </p>
            <h3>{question}</h3>
        </div>
        {
            show &&
            <p className='answers'>{answer}</p>
        }
    </div>
  )
}

export default Faqpage