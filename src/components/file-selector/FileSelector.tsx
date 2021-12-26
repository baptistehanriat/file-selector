import { Modal, styled } from "@mui/material";
import React, { useState } from "react";
import ButtonPrimary from "../cta/ButtonPrimary";
import FlexView from "../layout/FlexView";
import View from "../layout/View";
import Tree from "./components/Tree";
import TreeHeader from "./components/TreeHeader";
import { File, Folder } from "./types";

export default function FileSelector(props: FileSelectorProps) {
  const [currentFolder, setCurrentFolder] = useState<Folder>(props.rootFolder);
  const [history, setHistory] = useState<Folder[]>([]);
  const [newSelection, setNewSelection] = useState<File[]>(props.selection);

  function onBackwardNavigation() {
    history.splice(-1);
    if (history.length > 0) {
      setHistory(history);
      setCurrentFolder(history[history.length - 1]);
    } else {
      setCurrentFolder(props.rootFolder);
    }
  }

  function onForwardNavigation(selectedFolder: Folder) {
    setCurrentFolder(selectedFolder);
    setHistory([...history, selectedFolder]);
  }

  function onClose() {
    props.onClose();
    setHistory([]);
    setCurrentFolder(props.rootFolder);
  }

  function onAbort() {
    setNewSelection(props.selection);
    onClose();
  }

  function saveSelection() {
    props.saveSelection(newSelection);
    onClose();
  }

  function onFileSelection(file: File) {
    if (newSelection.includes(file)) {
      const updatedSelection = newSelection.filter(
        (item) => item.id !== file.id
      );
      setNewSelection(updatedSelection);
    } else {
      const updatedSelection = [...newSelection, file];
      setNewSelection(updatedSelection);
    }
  }

  return (
    <Modal open={props.open} onClose={onClose} hideBackdrop={true}>
      <ModalContentContainer>
        <FlexView>
          <TreeHeader
            onBackwardNavigation={onBackwardNavigation}
            onClose={onAbort}
            folder={currentFolder}
            isRoot={currentFolder.id === props.rootFolder.id}
          />
          <Tree
            onFolderSelection={onForwardNavigation}
            onFileSelection={onFileSelection}
            folder={currentFolder}
            selectedFiles={newSelection}
          />
          {newSelection.length > 0 ? (
            <ButtonPrimary
              style={{ alignSelf: "flex-end" }}
              onClick={saveSelection}
              label={`Select ${newSelection.length} file(s)`}
            />
          ) : (
            <ButtonPrimary
              status="disabled"
              style={{ alignSelf: "flex-end" }}
              label="Select files"
            />
          )}
        </FlexView>
      </ModalContentContainer>
    </Modal>
  );
}

interface FileSelectorProps {
  open: boolean;
  count: number;
  rootFolder: Folder;
  selection: File[];
  onClose(): void;
  saveSelection(files: File[]): void;
}

const ModalContentContainer = styled(View)`
  position: "absolute" as "absolute";
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  height: 500px;
  border-radius: 5;
  padding: 10px;
  background-color: white;
  box-shadow: 5px 5px 25px rgba(0, 0, 0, 0.1);
`;
