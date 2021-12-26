import { MdChevronLeft, MdClose } from "react-icons/md";
import Clickable from "../../cta/Clickable";
import FlexView from "../../layout/FlexView";
import View from "../../layout/View";
import { PrettyColors } from "../../style/colors";
import { H1Clamped } from "../../style/texts";
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
        <H1Clamped>Project title</H1Clamped>
      ) : (
        <>
          <Clickable onClick={props.onBackwardNavigation}>
            <MdChevronLeft color={PrettyColors.GreyDark} size={24} />
          </Clickable>
          <H1Clamped>{props.folder.name}</H1Clamped>
        </>
      )}
      <FlexView
        style={{
          alignItems: "flex-end",
        }}
      >
        <Clickable onClick={props.onClose}>
          <MdClose color={PrettyColors.GreyDark} size={24} />
        </Clickable>
      </FlexView>
    </View>
  );
}

interface TreeHeaderProps {
  isRoot: boolean;
  folder: Folder;
  onBackwardNavigation(): void;
  onClose(): void;
}
