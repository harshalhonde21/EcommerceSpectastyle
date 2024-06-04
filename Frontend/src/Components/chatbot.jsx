import '../CSS/Chatbot.css';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai"; // Assuming you have the package installed

const generationConfig = {
  stopSequences: ["red"],
  maxOutputTokens: 30720,
  temperature: 0.9,
  topP: 1,
  topK: 1,
};

function Chatbot()
{
    const [input,setInput]=useState("");
    const [message,setMessage]=useState([
        {
            text:"Hi im Spectastyle,How Can I Assist You Today? ",
            isbot:true
        }
    ]);
    const genAi = new GoogleGenerativeAI(import.meta.env.VITE_KEY);
    const model = genAi.getGenerativeModel({ model: "gemini-pro", generationConfig });


    const msgend=useRef(null);

  const handleReq = async () => {
    const text = input;

    setMessage([
        ...message,
        { text, isbot: false },
        { text: "Thinking...", isbot: true },
    ]);

    try {
        const chat = model.startChat({
            history: [
                {
                    role: "user",
                    parts: [{ text: "Hello, I'm bot." }],
                },
                {
                    role: "model",
                    parts: [{ text: "Nice to meet you." }],
                },
            ],
            generationConfig: {
                maxOutputTokens: 1000,
            },
        });

        const result = await chat.sendMessage(text);
        const response = await result.response;
        const textResponse = await response.text();

        setMessage([
            ...message,
            { text: textResponse, isbot: false },
        ]);
    } catch (e) {
        console.error('Error fetching response from Gemini:', e);
        setMessage([
            ...message,
            { text: "Spectastyle is offline. Wait for sometime.", isbot: true },
        ]);
    }
};

    const msgendRef = useCallback(node => {
        if (node) {
          node.scrollIntoView();
        }
      }, []);
      
      useEffect(() => {
        msgendRef();
      }, [message, msgendRef]);
    const handleClick=async (e)=>{
        if(e.key==='Enter')
        {
            await handleReq();
        }
    }
    const handleQuery=async (e)=> {
        const text = e.target.value;
        setMessage([
            ...message,
            {text, isbot: false},
            {text: "Thinking...", isbot: true},
        ]);
    }
    const [open,setOpen]=useState(false)
    return(
     <>
     <div className='chatbot'>
        {open &&(
           <div className='chatbot-main'>
            <div className='chats'>
            {message.map((mess, i) =>
                        <div key={i} className={mess.isbot ? "ch boo" : "ch"}>
                            <img src={ mess.isbot?"https://cdn-icons-png.flaticon.com/128/232/232375.png":"https://cdn-icons-png.flaticon.com/128/3940/3940417.png"}/>
                            <p className="txtt" dangerouslySetInnerHTML={{__html: mess.text.replace(/\n/g, '<br>')}}/>
                        </div>
                    )}
                </div>
            <div style={{display:"flex"}} className='input-box'>
                <input type='text' placeholder='Type a message' className='chatbot-input' value={input} onKeyDown={handleClick} onChange={(e)=>{setInput(e.target.value)}}/>
                <button className='chatbot-send' onClick={handleReq}>Send</button>
                </div>
            </div>
        )}
            <div className='chatbot-icon'>
                {!open?(
                <img src='https://cdn-icons-png.flaticon.com/128/10949/10949777.png' alt='chatbot-icon' style={{height:"50px"}} onClick={()=>setOpen(true)}/>
                ):(
                <img src='https://cdn-icons-png.flaticon.com/128/5369/5369422.png' alt='chatbot-icon' style={{height:"50px"}} onClick={()=>setOpen(false)}/>
                )}
                </div>
     </div>
     </>
    )
}
export default Chatbot;