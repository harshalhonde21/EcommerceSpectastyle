import { Fragment } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../CSS/HomeSecond.css";

const HomeSecond = () => {
    return (
        <Fragment>
            <div className="homeSecond-container">
                <h1 className="main-heading">Offers</h1>
                <div className="decorative-slider">
                    <Carousel>
                        <div>
                            <img src="/poster4.jpg" alt="Poster 1" />
                        </div>
                        <div>
                            <img src="/poster3.jpg" alt="Poster 2" />
                        </div>
                    </Carousel>
                </div>
            </div>
        </Fragment>
    );
};

export default HomeSecond;
