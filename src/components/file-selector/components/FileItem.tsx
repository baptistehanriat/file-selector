import { useState } from "react";
import { MdCheckCircle } from "react-icons/md";
import Clickable from "../../cta/Clickable";
import View from "../../layout/View";
import { PrettyColors } from "../../style/colors";
import { P1 } from "../../style/texts";
import { File } from "../types";

export default function FileItem(props: FileItemProps) {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <Clickable
      onClick={() => {
        setIsSelected(!isSelected);
        props.onSelection(props.file.name);
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
      <P1 style={{ marginLeft: 10 }}>{props.file.name}</P1>
      {isSelected && (
        <View style={{ flex: 1, alignItems: "flex-end" }}>
          <MdCheckCircle size={24} color={PrettyColors.PrimaryDark} />
        </View>
      )}
    </Clickable>
  );
}

interface FileItemProps {
  file: File;
  onSelection: (fileName: string) => void;
}
