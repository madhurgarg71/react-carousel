import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "./../../close.svg";

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 101;
`;

const ModalOverlay = styled.div`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  overflow: auto;
`;

const ModalContainerWrapper = styled.div`
  min-height: calc(100% - 3.5rem);
  margin: 1.75rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  position: relative;
  min-width: 300px;
  min-height: 120px;
  height: ${(props) => props.height};
  width: ${(props) => props.width || "auto"};
  max-width: 100%;
  border-radius: ${(props) => props.radius || "5px"};
  box-shadow: 0 2px 10px 0 #000000;
  background-color: #fff;
  overflow: auto;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 6px;
  right: 16px;
  z-index: 6;
  cursor: pointer;
`;

export default function Modal(props) {
  const keyListener = (event) => {
    if (event.keyCode === 27) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", keyListener);
    return () => {
      document.removeEventListener("keydown", keyListener);
    };
  });

  let elem = (
    <ModalWrapper>
      <ModalOverlay>
        <ModalContainerWrapper>
          <ModalContainer
            height={props.height}
            width={props.width}
            radius={props.radius}
          >
            {props.withClose && (
              <CloseIconWrapper onClick={props.onClose}>
                <CloseIcon />
              </CloseIconWrapper>
            )}
            {props.children}
          </ModalContainer>
        </ModalContainerWrapper>
      </ModalOverlay>
    </ModalWrapper>
  );

  return createPortal(elem, document.getElementById("modal--root"));
}
