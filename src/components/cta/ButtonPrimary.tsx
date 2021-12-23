import React from "react";
import styled from "styled-components";
import { PrettyColors } from "../style/colors";
import ButtonBase, { ButtonBaseProps } from "./ButtonBase";

export default function ButtonPrimary(props: ButtonBaseProps) {
  if (props.status === "disabled") {
    return <ButtonPrimaryDisabled {...props} labelColor={PrettyColors.Grey} />;
  } else {
    return <ButtonPrimaryActive {...props} labelColor={PrettyColors.White} />;
  }
}

const ButtonPrimaryActive = styled(ButtonBase)`
  background-color: ${PrettyColors.Primary};
  :hover {
    background-color: ${PrettyColors.PrimaryDark};
  }
`;

const ButtonPrimaryDisabled = styled(ButtonBase)`
  background-color: ${PrettyColors.GreyLight};
  border: 1px solid ${PrettyColors.Grey};
`;
