import { Fragment, useState } from 'react';
import "../CSS/Team.css";

const Team = () => {
  const [selectedMember, setSelectedMember] = useState(null);

  const teamMembers = [
    {
      name: "Om Charthal",
      image: "/om.jpg",
      bio: "Om Charthal had handle all the documentation and paper work of the Spectastyle ecommerce and warehouse management system and he develop the stunning UI for the website",
      position:"Document / UI-UX"
    },
    {
      name: "Mahima Pande",
      image: "mahima.jpg",
      bio: "Mahima Pande had handle all the client side render and UI development and develop all the component of the website and she had done the client side coding with React.js and develop the good UI provided by our designer Om ",
      position:"Frontend developer"
    },
    {
      name: "Abhit Rajkumar 3",
      image: "abhit.jpg",
      bio: "Abhit Rajkumar had handle all the client side render and UI development and develop all the pages of the website and he had done the client side coding with React.js and some animation and develop the good UI provided by our designer Om ",
      position:"Frontend developer"
    },
    {
      name: "Harshal Honde",
      image: "harshal.jpg",
      bio: "Harshal Honde had handle all the backend side work he had write the robust api as required and use secure jwt for the auth and develop robust backend to server side rendering and the response which are coming from the server is secure",
      position:"Backend developer / API Integration"
    },
    {
      name: "Harshit Ghagre",
      image: "harsit.jpg",
      bio: "Harshit Ghagre had host the website in two different platform the frontend which he hosted on vercel and backend is hosted on the Render he hosted the database in the cloud with the help of cluster and some devops technology like docker and kubernetis",
      position:"Frontend developer"
    },
  ];

  const handleMemberClick = (index) => {
    setSelectedMember(index);
  };

  return (
    <Fragment>
      <div className="team-container">
        <div className="left-side">
          <h2>Meet Our Tech Team</h2>
          <h3>Agile Team</h3>
          {selectedMember !== null && (
            <div className="member-details">
              <img  src={teamMembers[selectedMember].image} alt={teamMembers[selectedMember].name} />
              <h5>{teamMembers[selectedMember].bio}</h5>
            </div>
          )}
        </div>
        <div className="right-side">
          <div className="circle">
            <div className="member-background">
              {teamMembers.map((member, index) => (
                <div
                  className={`member ${selectedMember === index ? 'selected' : ''}`}
                  onClick={() => handleMemberClick(index)}
                  key={index}
                >
                  <img src={member.image} alt={member.name} />
                  <h6>{member.name} <br />{member.position}</h6>
                </div>
              ))}
            </div>
          </div>
          </div>
          
        
      </div>
    </Fragment>
  );
}

export default Team;
