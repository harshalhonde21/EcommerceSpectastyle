import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const Button = styled.button`
  position: fixed;
  left: 25px;
  bottom: 28px;
  padding: 10px 20px;
  background-color: #bf3f84;
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  width: 65px; 
  height: 65px; 
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.4s ease, transform 0.3s ease;
  
  &::after {
    content: attr(title);
    position: absolute;
    bottom: 70px; 
    left: 130%;
    transform: translateX(-50%);
    background-color: black;
    color: #FFD3DA;
    padding: 5px 10px;
    border-radius: 5px;
    white-space: nowrap;
    font-size: 14px;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s ease, visibility 0.2s ease;
    pointer-events: none;
  }
  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
  &:hover {
    background-color: #8a1a57;
    transform: scale(1.1);
  }
  svg {
    width: 100px; 
    height: 100px; 
  }
   
`;

const FeedbackButton = () => {
    return (
      <Link to="/feedback">
        <Button title='Thoughts to share?'>
          <svg xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512 452.387">
          <path fill-rule="nonzero" d="M276.915 436.666c-32.989-9.896-62.965-28.911-87.618-55.815 6.175.567 12.783.958 19.819 1.159 32.31.949 63.167-3.3 91.339-11.815 29.561-8.937 56.687-22.776 79.927-40.41 23.979-18.196 43.56-40.301 57.238-65.17 12.232-22.234 19.84-46.769 21.81-72.836a195.403 195.403 0 0112.994 13.486c19.513 22.316 33.012 48.301 37.715 75.028 4.856 27.594.457 55.851-16.114 81.723-5.048 7.88-11.248 15.52-18.686 22.824l8.165 49.068a15.502 15.502 0 01-.8 8.562c-3.132 8.017-12.171 11.976-20.188 8.844l-55.504-21.826c-44.846 17.676-89.637 19.315-130.097 7.178z"/>
          <path d="M212.522 382.09c51.415 47.307 122.9 61.072 194.383 30.61l61.283 24.098-9.593-57.651c57.022-49.859 43.787-119.134-1.727-167.884-3.555 18.854-10.111 36.745-19.248 53.352-13.678 24.869-33.259 46.974-57.238 65.17-23.24 17.634-50.366 31.473-79.927 40.41-27.181 8.215-56.861 12.459-87.933 11.895z"/>
          {/* chhota full */}
          <path fill-rule="nonzero" d="M369.951 55.167c38.685 33.165 61.879 78.348 60.427 127.704l-.004.172c-1.516 49.407-27.413 93.189-68.065 124.036-39.713 30.136-93.646 47.911-152.383 46.183-15.058-.442-29.669-1.977-43.59-4.684-11.877-2.308-23.389-5.475-34.399-9.545L25.552 371.527l31.949-75.984c-17.241-15.38-31.223-33.198-41.066-52.706C5.175 220.521-.707 196.009.068 170.392 1.561 120.96 27.462 77.156 68.131 46.297c85.638-64.984 220.168-61.131 301.82 8.87z"/>  
           {/* border big */}
          <path fill="#fa87c5" d="M220.09 15.665c110.235 3.244 197.422 77.965 194.731 166.89-2.688 88.93-94.233 158.397-204.469 155.154-27.75-.815-54.238-5.665-77.796-15.126l-79.801 24.374 23.518-55.933c-38.601-30.58-62.068-73.422-60.651-120.205 2.685-88.93 94.233-158.395 204.468-155.154z"/>
          {/* bada full 80067a*/}
          <path fill-rule="nonzero" fill="#fffff" d="M129.631 216.936c-5.368 0-9.72-4.352-9.72-9.72s4.352-9.72 9.72-9.72H249.43c5.368 0 9.72 4.352 9.72 9.72s-4.352 9.72-9.72 9.72H129.631zm0-68.927c-5.368 0-9.72-4.352-9.72-9.72 0-5.367 4.352-9.719 9.72-9.719h171.178c5.368 0 9.719 4.352 9.719 9.719 0 5.368-4.351 9.72-9.719 9.72H129.631z"/>
          </svg>
        </Button>
      </Link>
    );
  };
  
  export default FeedbackButton;
  