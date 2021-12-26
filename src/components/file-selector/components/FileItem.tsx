import { MdCheckCircle } from "react-icons/md";
import Clickable from "../../cta/Clickable";
import View from "../../layout/View";
import { PrettyColors } from "../../style/colors";
import { P1Clamped } from "../../style/texts";
import { File } from "../types";

export default function FileItem(props: FileItemProps) {
  return (
    <Clickable
      onClick={() => {
        props.onSelection(props.file);
      }}
    >
      <View
        style={{
          width: 28,
          height: 28,
          borderRadius: 5,
          overflow: "hidden",
        }}
      >
        <img
          style={{
            height: "100%",
            width: "100%",
            objectFit: "cover",
          }}
          src={props.file.url}
          alt={props.file.name}
        />
      </View>
      <P1Clamped>{props.file.name}</P1Clamped>
      {props.selectedFiles.includes(props.file) && (
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <MdCheckCircle size={24} color={PrettyColors.PrimaryDark} />
        </View>
      )}
    </Clickable>
  );
}

interface FileItemProps {
  file: File;
  selectedFiles: File[];
  onSelection(file: File): void;
}
