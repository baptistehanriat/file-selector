import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonPrimary from "./components/cta/ButtonPrimary";
import View from "./components/layout/View";
import { PrettyColors } from "./components/style/colors";
import { H1, P1 } from "./components/style/texts";
import { MdClose, MdChevronLeft, MdFolderOpen } from "react-icons/md";
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
}

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

function App() {
  const [showModal, setShowModal] = useState(false);

  const dataUrl = "https://api-dev.reo.so/api/folderStructure";
  const [rootFolder, setRootFolder] = useState<Folder>();
  const [currentFolder, setCurrentFolder] = useState<Folder>();
  const [history, setHistory] = useState<Folder[]>([]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentFolder(rootFolder);
    setHistory([]);
  };

  useEffect(() => {
    axios
      .get(dataUrl)
      .then((response) => {
        setRootFolder(response.data);
        setCurrentFolder(response.data);
      })
      .catch((error) => {
        // TODO: handle error
        // Return error view
        console.log(error);
        return;
      });
  }, []);

  function handleChange(selectedFolder: Folder) {
    setCurrentFolder(selectedFolder);
    setHistory([...history, selectedFolder]); // doesn't update at the same time as outside function
  }

  return (
    <View
      style={{
        flex: 1,
        marginTop: 200,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ButtonPrimary onClick={handleOpenModal} label="Select Files" />
      <Modal open={showModal} onClose={handleCloseModal} hideBackdrop={true}>
        <View style={style}>
          <View style={{ flexDirection: "row" }}>
            <Selector
              onClick={() => {
                history.splice(-1); // cannot use Pop for tsx reasons
                if (history.length > 0) {
                  setHistory(history);
                  setCurrentFolder(history[history.length - 1]);
                } else {
                  setCurrentFolder(rootFolder);
                }
              }}
            >
              <MdChevronLeft
                color={PrettyColors.GreyDark}
                size={24}
                style={{ marginRight: 10 }}
              />
            </Selector>
            <H1 style={{ fontFamily: "Roboto" }}>{currentFolder?.name}</H1>
            <Selector
              style={{ justifySelf: "flex-end" }}
              onClick={() => setShowModal(false)}
            >
              <MdClose
                color={PrettyColors.GreyDark}
                size={24}
                style={{ marginRight: 10 }}
              />
            </Selector>
          </View>

          <FolderView folder={currentFolder!} onChange={handleChange} />
          <ButtonPrimary
            style={{ alignSelf: "flex-end" }}
            onClick={handleCloseModal}
            label="Close"
          />
        </View>
      </Modal>
    </View>
  );
}

function FolderView(props: {
  folder: Folder;
  onChange: (selectedFolder: Folder, currentFolder: Folder) => void;
}) {
  return (
    <View style={{ flex: 1 }}>
      {props.folder?.folders.map((folder) => {
        return (
          <Selector
            onClick={() => props.onChange(folder, props.folder)}
            key={folder.id}
          >
            <MdFolderOpen
              color={PrettyColors.GreyDark}
              size={24}
              style={{ marginRight: 10 }}
            />
            <P1>{folder.name}</P1>
          </Selector>
        );
      })}
      {props.folder?.files.map((file) => {
        return (
          isValidFileFormat(file.name) && <FileView key={file.id} {...file} />
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

function FileView(file: File) {
  return (
    <Selector>
      <P1>{file.name}</P1>
    </Selector>
  );
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  height: 500,
  borderRadius: 5,
  padding: 20,
  backgroundColor: "white",
  boxShadow: "5px 5px 25px rgba(0, 0, 0, 0.1)",
};

const Selector = styled(View)`
  color: ${PrettyColors.GreyDark};
  background-color: transparent;
  display: flex;
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
