import pageNotFoundImage from "../../public/404.png"
import '../CSS/404page.css';



const PageNotFound = () => {
    return (
        <div className="not-found-container">
         
          <img src={pageNotFoundImage} alt="404 Error" style={{ width: '300px', height: 'auto' }} />
          <h1>Oops! It looks like you're lost.</h1>
          <h1>Go back to <a href="/">homepage</a>.</h1>
        </div>
      );
}

export default PageNotFound;