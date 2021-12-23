import { MdChevronLeft, MdClose } from "react-icons/md";
import Clickable from "../../cta/Clickable";
import FlexView from "../../layout/FlexView";
import View from "../../layout/View";
import { PrettyColors } from "../../style/colors";
import { H1 } from "../../style/texts";
import { Folder } from "../types";

export default function TreeHeader(props: TreeHeaderProps) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
      }}
    >
      {props.isRoot ? (
        <H1 style={{ marginLeft: 10, fontFamily: "Roboto" }}>Project title</H1>
      ) : (
        <>
          <Clickable onClick={props.handleBackwardNavigation}>
            <MdChevronLeft color={PrettyColors.GreyDark} size={24} />
          </Clickable>
          <H1 style={{ marginLeft: 10, fontFamily: "Roboto" }}>
            {props.folder.name}
          </H1>
        </>
      )}
      <FlexView
        style={{
          alignItems: "flex-end",
        }}
      >
        <Clickable onClick={props.handleClose}>
          <MdClose color={PrettyColors.GreyDark} size={24} />
        </Clickable>
      </FlexView>
    </View>
  );
}

interface TreeHeaderProps {
  isRoot: boolean;
  folder: Folder;
  handleBackwardNavigation(): void;
  handleClose(): void;
}
