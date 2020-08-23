import React, { useEffect, useState } from "react";
import Slider from "./Slider";
import styled from "styled-components";
import Dialog from "./components/Modal/Dialog";

const Image = styled.img`
  cursor: pointer;
`;

function App() {
  const [data, setData] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const sliderConfig = {
    slidesToShow: 4,
  };

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/photos?_limit=20", {
      method: "get",
    })
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  return (
    <div className="App">
      <Slider {...sliderConfig}>
        {data.map((item, index) => (
          <Image
            key={index}
            onClick={() => handleClick(item)}
            src={item.thumbnailUrl}
            alt=""
          />
        ))}
      </Slider>

      {showImageModal && (
        <Dialog onClose={() => setShowImageModal(false)}>
          <img src={selectedImage.url} alt="" />
        </Dialog>
      )}
    </div>
  );
}

export default App;
