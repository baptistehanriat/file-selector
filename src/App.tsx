import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  MdChevronLeft,
  MdClose,
  MdErrorOutline,
  MdFolderOpen,
  MdChevronRight,
  MdCheckCircle,
} from "react-icons/md";
import styled from "styled-components";
import ButtonPrimary from "./components/cta/ButtonPrimary";
import View from "./components/layout/View";
import { PrettyColors } from "./components/style/colors";
import { H1, P1 } from "./components/style/texts";

//TODO:
// - [x] The Overlay can be triggered by different buttons and places within the app
// - [x] Disable or hide files that do not have the type JPG, PNG, PDF
// - [x] A folder can not be selected, as it navigates to a new folder
// - [x] The arrow pointing to the left navigates to the parent folder of the current folder
// - [x] The title shows the current Folder name
// - The X aborts the folder and clears the selection
// - Files can be selected across multiple folders
// - The amount of files selected is shown within the button
// - The list of folder and filters is scrollable, and starts below the Title and stops above the Button area
// - Files and folder have the same hover and pressed states
// - The Overlay should support to be opened with the selected items marked
// - Clicking a file toggles adds and removes it from the selection.
// - The list is updated with pressing the Add button

// - filename should be cut if too long
// - make view scrollable if too much content
// - error view if data not properly fetch
interface Folder {
  name: string;
  id: string;
  parentFolderId: string;
  folders: Folder[];
  files: File[];
}

interface File {
  name: string;
  id: string;
  url: string;
}

function App() {
  const dataUrl = "https://api-dev.reo.so/api/folderStructure";

  const [showModal, setShowModal] = useState(false);
  const [rootFolder, setRootFolder] = useState<Folder>();
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);
  const [validData, setValidData] = useState(false);

  useEffect(() => {
    axios
      .get(dataUrl)
      .then((response) => {
        console.log(response.data);
        setRootFolder(response.data);
        setValidData(true);
      })
      .catch((error) => {
        console.log(error);
        setValidData(false);
      });
  }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedFiles([]);
  };
  const handleFileSelection = (fileName: string) => {
    setSelectedFiles([...selectedFiles, fileName]);
  };

  return (
    <Container>
      <ButtonPrimary onClick={handleOpenModal} label="Select Files" />
      <Modal open={showModal} onClose={handleCloseModal} hideBackdrop={true}>
        <View style={modalContentStyle}>
          {validData ? (
            <FileSelector
              onClose={() => setShowModal(false)}
              onChange={handleFileSelection}
              rootFolder={rootFolder!}
            />
          ) : (
            <ErrorMessage onClose={() => setShowModal(false)} />
          )}
        </View>
      </Modal>
    </Container>
  );
}

function FileSelector(props: FileSelectorProps) {
  const [currentFolder, setCurrentFolder] = useState<Folder>(props.rootFolder);
  const [history, setHistory] = useState<Folder[]>([]);

  function isRoot(folder: Folder) {
    return folder === props.rootFolder;
  }

  function handleChange(selectedFolder: Folder) {
    setCurrentFolder(selectedFolder);
    setHistory([...history, selectedFolder]); // doesn't update at the same time as outside function
  }
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: 10,
        }}
      >
        {isRoot(currentFolder) ? (
          <H1 style={{ marginLeft: 10, fontFamily: "Roboto" }}>
            Project title
          </H1>
        ) : (
          <>
            <Clickable
              onClick={() => {
                history.splice(-1);
                if (history.length > 0) {
                  setHistory(history);
                  setCurrentFolder(history[history.length - 1]);
                } else {
                  setCurrentFolder(props.rootFolder);
                }
              }}
            >
              <MdChevronLeft color={PrettyColors.GreyDark} size={24} />
            </Clickable>
            <H1 style={{ marginLeft: 10, fontFamily: "Roboto" }}>
              {currentFolder?.name}
            </H1>
          </>
        )}
        <View
          style={{
            flex: 1,
            alignItems: "flex-end",
          }}
        >
          <Clickable onClick={props.onClose}>
            <MdClose color={PrettyColors.GreyDark} size={24} />
          </Clickable>
        </View>
      </View>

      <Tree
        folder={currentFolder!}
        onChange={handleChange}
        onSelection={props.onChange}
      />
      <ButtonPrimary
        style={{ alignSelf: "flex-end" }}
        onClick={props.onClose}
        label="Close"
      />
    </View>
  );
}

function ErrorMessage(props: ErrorMessageProps) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MdErrorOutline size={40} color={PrettyColors.GreyDark} />
      <P1>Sorry, no data were found!</P1>
      <ButtonPrimary label="Close" onClick={props.onClose} />
    </View>
  );
}

interface FileSelectorProps {
  rootFolder: Folder;
  onChange: (fileName: string) => void;
  onClose(): void;
}

interface ErrorMessageProps {
  onClose(): void;
}
function Tree(props: {
  folder: Folder;
  onChange: (selectedFolder: Folder, currentFolder: Folder) => void;
  onSelection: (fileName: string) => void;
}) {
  return (
    <View style={{ flex: 1 }}>
      {props.folder?.folders.map((folder) => {
        return (
          <Clickable
            onClick={() => props.onChange(folder, props.folder)}
            key={folder.id}
          >
            <MdFolderOpen
              color={PrettyColors.GreyDark}
              size={24}
              style={{ marginRight: 10 }}
            />
            <P1>{folder.name}</P1>
            <View style={{ flex: 1, alignItems: "flex-end" }}>
              <MdChevronRight color={PrettyColors.GreyDark} size={24} />
            </View>
          </Clickable>
        );
      })}
      {props.folder?.files.map((file) => {
        return (
          isValidFileFormat(file.name) && (
            <FileItem
              key={file.id}
              file={file}
              onSelection={props.onSelection}
            />
          )
        );
      })}
    </View>
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

function FileItem(props: FileItemProps) {
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
const modalContentStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  borderRadius: 5,
  padding: 10,
  backgroundColor: "white",
  boxShadow: "5px 5px 25px rgba(0, 0, 0, 0.1)",
};

const Container = styled(View)`
  flex: 1;
  margin-top: 200px;
  justify-content: center;
  align-items: center;
`;

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

export default App;
