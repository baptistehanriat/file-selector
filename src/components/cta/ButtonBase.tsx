import React from "react";
import styled, { CSSProperties } from "styled-components";
import { P1 } from "../style/texts";

export default function ButtonBase(props: ButtonBaseProps) {
  const disabled = props.status === "disabled";
  return (
    <ButtonBaseStyled
      type="button"
      disabled={disabled}
      onClick={props.onClick}
      {...props}
    >
      <P1 style={{ color: props.labelColor }}>{props.label}</P1>
    </ButtonBaseStyled>
  );
}

export interface ButtonBaseProps {
  label?: string;
  labelColor?: string;
  onClick?(): void;
  status?: "enabled" | "disabled";
  style?: CSSProperties;
  className?: string;
}

const ButtonBaseStyled = styled.button`
  height: 50px;
  border-radius: 10px;
  border: none;
  padding: 0 20px 0 20px;
  transition: all 0.1s ease-out;
  cursor: pointer;
  :focus {
    outline: none;
  }
`;
