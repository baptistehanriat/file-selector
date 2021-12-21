import React from "react";
import styled from "styled-components";
import { PrettyColors } from "../style/colors";
import ButtonBase, { ButtonBaseProps } from "./ButtonBase";

export default function ButtonPrimary(props: ButtonBaseProps) {
  if (props.status === "disabled") {
    return <ButtonPrimaryDisabled {...props} />;
  } else {
    return <ButtonPrimaryActive {...props} />;
  }
}

const ButtonPrimaryActive = styled(ButtonBase)`
  color: ${PrettyColors.White};
  background-color: ${PrettyColors.Primary};
  :hover {
    background-color: ${PrettyColors.PrimaryDark};
  }
`;

const ButtonPrimaryDisabled = styled(ButtonBase)`
  color: ${PrettyColors.Grey};
  background-color: ${PrettyColors.GreyLight};
  border: 1px solid ${PrettyColors.Grey};
`;
