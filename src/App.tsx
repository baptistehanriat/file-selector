import { Folder } from "@mui/icons-material";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "./components/cta/ButtonPrimary";
import View from "./components/layout/View";

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
          <h3
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
            {currentFolder?.name}
          </h3>
          <FolderView folder={currentFolder!} onChange={handleChange} />
          <ButtonPrimary onClick={handleCloseModal} label="Close" />
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
    <View>
      {props.folder?.folders.map((folder) => {
        return (
          <h1
            onClick={() => props.onChange(folder, props.folder)}
            key={folder.id}
          >
            {folder.name}
          </h1>
        );
      })}
      {props.folder?.files.map((file) => {
        return <FileView key={file.id} {...file} />;
      })}
    </View>
  );
}

function FileView(file: File) {
  return (
    <View>
      <h1>{file.name}</h1>
    </View>
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
  backgroundColor: "white",
  boxShadow: "5px 5px 25px rgba(0, 0, 0, 0.1)",
};

export default App;
