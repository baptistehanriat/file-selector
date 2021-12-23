import styled from "styled-components";
import View from "../layout/View";
import { PrettyColors } from "../style/colors";

const Clickable = styled(View)`
  color: ${PrettyColors.GreyDark};
  background-color: transparent;
  display: flex;
  height: 44px;
  flex-direction: row;
  align-items: center;
  padding: 0px 10px;
  border-radius: 5px;
  cursor: pointer;
  :hover {
    background-color: ${PrettyColors.GreyLight};
  }
  :active {
    background-color: ${PrettyColors.Grey};
  }
`;

export default Clickable;
