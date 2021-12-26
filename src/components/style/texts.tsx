import styled from "styled-components";
import { PrettyColors } from "./colors";

export const H1 = styled.h4`
  font-family: Roboto;
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: -0.4px;
  margin: 0;
  color: ${PrettyColors.Dark};
`;

export const P1 = styled.p`
  font-family: Roboto;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  letter-spacing: 0.2px;
  color: ${PrettyColors.GreyDark};
`;

export const H1Clamped = styled(H1)`
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;

export const P1Clamped = styled(P1)`
  margin-left: 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
`;
