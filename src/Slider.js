import React, { useState, useEffect, useRef } from "react";
import styled, { css } from "styled-components";

const NavButtonCSS = css`
  height: 50%;
  opacity: 0.5;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  cursor: pointer;
`;

const NaveButtonPrev = styled.button`
  ${NavButtonCSS};
  left: 0;
`;

const NavButtonNext = styled.button`
  ${NavButtonCSS};
  right: 0;
`;

export default function Slider(props) {
  const [avgWidth, setAvgWidth] = useState(0);
  const { children, slidesToShow, slidesToScroll } = props;
  const [transLateAmount, setTranslateAmount] = useState(0);
  const [sliderWrapperWidth, setSliderWrapperWidth] = useState(0);
  const [sliderContentWidth, setSliderContentWidth] = useState(0);
  const refs = useRef({});

  const refsLen = Object.keys(refs).length;
  const childrenCount = React.Children.count(children);

  useEffect(() => {
    setSliderContentWidth(avgWidth * childrenCount);
  }, [childrenCount, avgWidth]);

  useEffect(() => {
    const width = slidesToShow * avgWidth;
    if (width > window.innerWidth) {
      setSliderWrapperWidth(window.innerWidth);
    } else {
      setSliderWrapperWidth(width);
    }
  }, [slidesToShow, avgWidth]);

  const prevSlide = () => {
    if (transLateAmount === 0) return;
    setTranslateAmount((prev) => prev + avgWidth * slidesToScroll);
  };

  const nextSlide = () => {
    if (transLateAmount <= sliderWrapperWidth - sliderContentWidth) return;
    setTranslateAmount((prev) => prev - avgWidth * slidesToScroll);
  };

  useEffect(() => {
    const avgWidth = Object.entries(refs.current).reduce((acc, [_, ref]) => {
      const imgDimension = ref.childNodes[0].getBoundingClientRect();
      return Math.floor(acc + imgDimension.width / childrenCount);
    }, 0);

    setAvgWidth(avgWidth);
  }, [refsLen, childrenCount]);

  return (
    <Slider.Wrapper width={sliderWrapperWidth}>
      <NaveButtonPrev onClick={prevSlide}>Prev</NaveButtonPrev>
      <Slider.Content
        width={sliderContentWidth}
        transLateAmount={transLateAmount}
      >
        {React.Children.map(children, (child, index) => {
          const $el = React.cloneElement(child, {
            key: index,
          });

          //not able to attach ref on children directly
          return (
            <Slider.Slide
              width={avgWidth}
              ref={(node) => (refs.current[index] = node)}
            >
              {$el}
            </Slider.Slide>
          );
        })}
      </Slider.Content>
      <NavButtonNext onClick={nextSlide}>Next</NavButtonNext>
    </Slider.Wrapper>
  );
}

Slider.Wrapper = styled.div`
  /* border: 4px solid red; */
  overflow-x: hidden;
  position: relative;
  width: ${(props) => `${props.width}px`};
  margin: 0 auto;
`;

Slider.Content = styled.div`
  width: ${(props) => `${props.width}px`};
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.6);
  display: inline-flex;
  transition: 0.3s;
  transform: ${(props) => `translateX(${props.transLateAmount}px)`};
`;

Slider.Slide = styled.div`
  width: ${(props) => `${props.width}px`};
  height: ${(props) => `${props.width}px`};
`;
