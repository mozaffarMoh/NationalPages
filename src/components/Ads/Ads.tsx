import { Carousel, Spinner } from "react-bootstrap";
import slideEmptyIcon from "../../assets/images/Ads/slide-empty.jpg";
import slideFillIcon from "../../assets/images/Ads/slide-fill.jpg";
import "./Ads.scss";
import React from "react";
import useGet from "../../api/useGet";
import { endPoint } from "../../api/endPoints";
import Cookies from "js-cookie";

const Ads = () => {
  const [indexValue, setIndexValue] = React.useState(2);
  const collegeUUID = Cookies.get("collegeUUID");
  const position = location.pathname == "/subject-selection" ? "exam" : "home";
  const [data, , loading]: any = useGet(endPoint.sliders, {
    isCollege_UUID: true,
    college_UUID: collegeUUID,
    isPosition: true,
    position: position,
  });

  const handleCarouselSelect = (selectedIndex: number) => {
    setIndexValue(selectedIndex);
  };

  return (
    <div className="ads flexCenterColumn">
      <Carousel activeIndex={indexValue} onSelect={handleCarouselSelect}>
        {data &&
          data.map((item: any, index: number) => {
            return (
              <Carousel.Item key={index} className="ads-item">
                {item.url.map((path: any, pathIndex: number) => {
                  return <img src={path.url} key={pathIndex} alt="img" />;
                })}
              </Carousel.Item>
            );
          })}
      </Carousel>
      <div className="flexCenter slide-icons-container">
        {data &&
          data.map((_: any, index: number) => {
            return index === indexValue ? (
              <img
                src={slideFillIcon}
                alt=""
                className="slide-icon"
                key={index}
              />
            ) : (
              <img
                src={slideEmptyIcon}
                alt=""
                className="slide-icon"
                key={index}
              />
            );
          })}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Ads;
