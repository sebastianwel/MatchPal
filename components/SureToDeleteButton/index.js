import styled from "styled-components";
import { Paragraph } from "../Paragraph";

export default function SureToDeleteModal({ onDelete, onCancel, children }) {
  return (
    <SureToDeleteModalOverlay>
      <SureToDeleteContainer>
        <Paragraph>{children}</Paragraph>
        <ButtonContainer>
          <SureDelete onClick={onDelete}>Ja, entfernen</SureDelete>
          <NoBack onClick={onCancel}>Nein, zurück</NoBack>
        </ButtonContainer>
      </SureToDeleteContainer>
    </SureToDeleteModalOverlay>
  );
}
const SureToDeleteModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  overflow: auto;
`;

const SureToDeleteContainer = styled.div`
  width: 250px;
  height: 250px;
  background-color: var(--app-background-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  padding: 5px;
  transition: transform 0.3s ease;
  overflow: none;
  background-color: #fff;
  color: var(--text-color);
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const SureDelete = styled.button`
  color: #fff;
  background-color: #d11a2a;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  padding: 10px;
  border: none;
`;

const NoBack = styled.button`
  color: #b66dde;
  border-radius: 10px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.25);
  padding: 10px;
  border: 1px solid;
  border-color: #b66dde;
  background-color: #fff;
`;
