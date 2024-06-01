import React, { useState } from 'react';
import '../CSS/Faq.css';
import { questions } from '../Components/FAQ/Faqdata';
import Faqpage from '../Components/FAQ/Faqpage';

const Faq = () => {
    const [data, setData] = useState(questions);
  return (
    <div className="faq-container">
        <h1 className='faq-heading'>FAQ</h1>
        <div>
            {
                data.map((curr) => {
                    return <Faqpage key={curr.id} {...curr}/>
                })
            }
        </div>
    </div>
  )
}

export default Faq