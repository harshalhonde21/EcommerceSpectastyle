import React from 'react';
import { Link } from 'react-router-dom';
import '../CSS/NotFound.css'; // Import external CSS file for additional styling

export default function NotFound() {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <img
          src="https://imgs.search.brave.com/egqBNjKYN5g_ABkIqDjtuPpmaY0qlyCmvJN4bfmTjY8/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTQw/NDA1OTcwNi92ZWN0/b3Ivd2Vic2l0ZS1w/YWdlLW5vdC1mb3Vu/ZC1lcnJvci00MDQt/b29wcy13b3JyaWVk/LXJvYm90LWNoYXJh/Y3Rlci1wZWVraW5n/LW91dC1vZi1vdXRl/ci1zcGFjZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9RHZQ/QVVvZjlVc051TnFD/SnkyWjdaTExrNzVx/REEzYmJMWE9PV181/MHdBaz0"
          alt="Not Found"
          className="not-found-image"
        />
        <h1 className="not-found-heading">Page Not Found!</h1>
        <Link className="not-found-link" to={'/'}>Go Home</Link>
      </div>
    </div>
  );
}
