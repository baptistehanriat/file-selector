import FlexView from "../../layout/FlexView";
import { Folder } from "../types";
import FileItem from "./FileItem";
import FolderItem from "./FolderItem";

export default function Tree(props: TreeProps) {
  return (
    <FlexView>
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
          isValidFileFormat(file.name) && (
            <FileItem
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

function isValidFileFormat(filename: string) {
  switch (filename.slice(-3)) {
    case "pdf":
      return true;
    case "png":
      return true;
    case "jpg":
      return true;
    default:
      return false;
  }
}

interface TreeProps {
  folder: Folder;
  onFolderSelection(selectedFolder: Folder): void;
  onFileSelection: (fileName: string) => void;
}
