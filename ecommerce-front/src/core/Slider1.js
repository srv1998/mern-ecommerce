import React from "react";
import Slider from "react-slick"; 
class Slider1 extends React.Component {
  render() {
    var settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay:true,
      slidesToShow: 3,
      slidesToScroll: 3,
      pauseOnHover: true,
      infinite:true
    };
    return (
      <Slider {...settings} style={{height:'300px'}}>
        <div class="slide slide--has-caption slick-slide">
          <img src="/images/s1.jpg" style={{height:'300px',width:'100%'}}></img>
          <div class="slide__caption">this picture</div>
        </div>
        <div>
        <img src="/images/s2.jpg" style={{height:'300px',width:'100%'}}></img>
        </div>
        <div>
        <img src="/images/s3.jpg" style={{height:'300px',width:'100%'}}></img>
        </div>
        <div>
        <img src="/images/s4.jpg" style={{height:'300px',width:'100%'}}></img>
        </div>
        <div>
        <img src="/images/s5.jpg" style={{height:'300px',width:'100%'}}></img>
        </div>
        <div>
        <img src="/images/s6.jpg" style={{height:'300px',width:'100%'}}></img>
        </div>
        <div>
        <img src="/images/s7.jpg" style={{height:'300px',width:'100%'}}></img>
        </div>
        <div>
        <img src="/images/s8.jpg" style={{height:'300px',width:'100%'}}></img>
        </div>
        <div>
        <img src="/images/s9.jpg" style={{height:'300px',width:'100%'}}></img>
        </div>
      </Slider>
    );
  }
}
export default Slider1