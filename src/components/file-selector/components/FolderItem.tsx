import { MdFolderOpen, MdChevronRight } from "react-icons/md";
import Clickable from "../../cta/Clickable";
import View from "../../layout/View";
import { PrettyColors } from "../../style/colors";
import { FileSelectorItem, P1 } from "../../style/texts";
import { Folder } from "../types";

export default function FolderItem(props: FolderItemProps) {
  return (
    <Clickable onClick={() => props.onSelection(props.folder)}>
      <MdFolderOpen
        color={PrettyColors.GreyDark}
        size={24}
        style={{ marginRight: 10 }}
      />
      <FileSelectorItem>{props.folder.name}</FileSelectorItem>
      <View style={{ flex: 1, alignItems: "flex-end" }}>
        <MdChevronRight color={PrettyColors.GreyDark} size={24} />
      </View>
    </Clickable>
  );
}

interface FolderItemProps {
  folder: Folder;
  onSelection: (selectedFolder: Folder) => void;
}
