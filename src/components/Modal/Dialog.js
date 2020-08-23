import React from "react";
import Modal from "./index";
import styled from "styled-components";
import { ReactComponent as CloseIcon } from "./../../close.svg";

const ModalHeader = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 1;
  background-color: white;
  padding: 5px;
`;

const ModalHeading = styled.h1`
  font-size: 20px;
  color: #333;
  margin: 20px 0;
  text-align: center;
`;

const ModalFooter = styled.div`
  position: sticky;
  bottom: 0;
  width: 100%;
  z-index: 1;
`;

const ModalBody = styled.div`
  display: flex;
  justify-content: center;
  overflow: hidden;
`;

const CloseIconWrapper = styled.div`
  position: absolute;
  top: 6px;
  right: 16px;
  z-index: 6;
  cursor: pointer;
`;

function Dialog(props) {
  return (
    <Modal height={props.height} width={props.width} onClose={props.onClose}>
      <ModalHeader>
        <CloseIconWrapper onClick={props.onClose}>
          <CloseIcon width="20px" />
        </CloseIconWrapper>
        {props.header}
        <ModalHeading>{props.title}</ModalHeading>
      </ModalHeader>
      <ModalBody>{props.children}</ModalBody>
      <ModalFooter>{props.footer}</ModalFooter>
    </Modal>
  );
}

export default Dialog;
