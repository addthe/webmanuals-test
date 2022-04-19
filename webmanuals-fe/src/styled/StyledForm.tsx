import styled from "styled-components";

export const Container = styled.div`
  display: grid;
  justify-items: center;
  margin: 40px 0;
`;

export const Form = styled.form`
  width: 400px;
  border-radius: 8px;
  padding: 40px;
  box-shadow: 0 0 16px 4px rgb(42, 74, 139, 20%);
  background-color: white;
  margin-bottom: 16px;
`;

export const DivGroup = styled.div`
  margin-bottom: 16px;
  width: 20%;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const Input = styled.input`
  width: 100%;
  height: 32px;
  border-radius: 4px;
  padding-left: 8px;
  box-shadow: 2px 2px 5px 2px rgb(42, 74, 139, 0.2);
  border: none;

  &:focus {
    outline: none;
  }
`;

export const Button = styled.button`
  width: 120px;
  height: 40px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  font-size: 16px;
  color: black;
`;
