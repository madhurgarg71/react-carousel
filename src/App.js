import React, { useEffect, useState, useRef } from "react";
import Slider from "./Slider";
import styled from "styled-components";
import Dialog from "./components/Modal/Dialog";

const Button = styled.button`
  background-color: #fff;
  border: 2px solid #000;
  color: #000;
  text-transform: uppercase;
  cursor: pointer;
  padding: 0 15px;
  height: 42px;
  font-weight: bold;
  &:hover {
    color: #fff;
    background-color: #000;
  }
`;

const Image = styled.img`
  cursor: pointer;
  width: 200px;
  height: 200px;
`;

function App() {
  const [data, setData] = useState([]);
  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sliderKey, setSliderKey] = useState("slider_0");

  const uploadRef = useRef();

  const handleClick = (image) => {
    setSelectedImage(image);
    setShowImageModal(true);
  };

  const handleUploadClick = () => {
    uploadRef.current.click();
  };

  const handleUploadChange = (e) => {
    const res = [];
    Object.entries(e.target.files).forEach(([_, file]) => {
      res.push({
        url: URL.createObjectURL(file),
        thumbnailUrl: URL.createObjectURL(file),
      });
    });

    setData(res);
    setSliderKey("slider_1");
  };

  const sliderConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    gap: 10,
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
      <Slider key={sliderKey} {...sliderConfig}>
        {data.map((item, index) => (
          <Image
            key={index}
            onClick={() => handleClick(item)}
            src={item.thumbnailUrl}
            alt=""
          />
        ))}
      </Slider>

      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button onClick={handleUploadClick}>Upload images</Button>
      </div>

      <input
        onChange={handleUploadChange}
        ref={uploadRef}
        style={{ display: "none" }}
        multiple
        type="file"
      />

      {showImageModal && (
        <Dialog width="620px" onClose={() => setShowImageModal(false)}>
          <img width="100%" src={selectedImage.url} alt="" />
        </Dialog>
      )}
    </div>
  );
}

export default App;
