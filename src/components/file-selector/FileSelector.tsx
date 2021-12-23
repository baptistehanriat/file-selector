import { Modal, styled } from "@mui/material";
import React, { useState } from "react";
import ButtonPrimary from "../cta/ButtonPrimary";
import FlexView from "../layout/FlexView";
import View from "../layout/View";
import Tree from "./components/Tree";
import TreeHeader from "./components/TreeHeader";
import { Folder, File } from "./types";

export default function FileSelector(props: FileSelectorProps) {
  const [currentFolder, setCurrentFolder] = useState<Folder>(props.rootFolder);
  const [history, setHistory] = useState<Folder[]>([]);

  function handleBackwardNavigation() {
    history.splice(-1);
    if (history.length > 0) {
      setHistory(history);
      setCurrentFolder(history[history.length - 1]);
    } else {
      setCurrentFolder(props.rootFolder);
    }
  }

  function handleForwardNavigation(selectedFolder: Folder) {
    setCurrentFolder(selectedFolder);
    setHistory([...history, selectedFolder]);
  }

  function handleClose() {
    props.handleClose();
    setCurrentFolder(props.rootFolder);
  }

  return (
    <Modal open={props.open} onClose={handleClose} hideBackdrop={true}>
      <ModalContentContainer>
        <FlexView>
          <TreeHeader
            handleBackwardNavigation={handleBackwardNavigation}
            handleClose={handleClose}
            folder={currentFolder}
            isRoot={currentFolder.id === props.rootFolder.id}
          />
          <Tree
            onFolderSelection={handleForwardNavigation}
            onFileSelection={props.handleSelection}
            folder={currentFolder}
            selectedFiles={props.selectedFiles}
          />
          {props.count > 0 ? (
            <ButtonPrimary
              style={{ alignSelf: "flex-end" }}
              onClick={props.handleClose}
              label={`Select ${props.count} file(s)`}
            />
          ) : (
            <ButtonPrimary
              status="disabled"
              style={{ alignSelf: "flex-end" }}
              onClick={props.handleClose}
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
  selectedFiles: File[];
  handleClose(): void;
  handleSelection(file: File): void;
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
