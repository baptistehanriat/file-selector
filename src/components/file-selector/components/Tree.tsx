import FlexView from "../../layout/FlexView";
import { File, Folder } from "../types";
import FileItem from "./FileItem";
import FolderItem from "./FolderItem";

export default function Tree(props: TreeProps) {
  return (
    <FlexView style={{ overflowY: "scroll" }}>
      {props.folder?.folders.map((folder) => {
        return (
          <FolderItem
            key={folder.id}
            folder={folder}
            onSelection={props.onFolderSelection}
          />
        );
      })}
      {props.folder?.files.map((file) => {
        return (
          isValidFileFormat(file.mimeType) && (
            <FileItem
              selectedFiles={props.selectedFiles}
              key={file.id}
              file={file}
              onSelection={props.onFileSelection}
            />
          )
        );
      })}
    </FlexView>
  );
}

function isValidFileFormat(fileFormat: string) {
  switch (fileFormat.split("/").slice(-1)[0]) {
    case "pdf":
      return true;
    case "png":
      return true;
    case "jpeg":
      return true;
    default:
      return false;
  }
}

interface TreeProps {
  folder: Folder;
  selectedFiles: File[];
  onFolderSelection(selectedFolder: Folder): void;
  onFileSelection(file: File): void;
}
