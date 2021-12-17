import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ButtonPrimary from "./components/cta/ButtonPrimary";
import View from "./components/layout/View";

interface Tree {
  name: string;
  id: string;
  parentFolderId: string;
  folders: Tree[];
  files: File[];
}

interface File {
  name: string;
  id: string;
}

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const dataUrl = "https://api-dev.reo.so/api/folderStructure";

  const [tree, setTree] = useState<Tree>();

  useEffect(() => {
    axios.get(dataUrl).then((response) => {
      setTree(response.data);
    });
  }, []);
  // TODO: add error state management for axios get
  if (!tree) return null;

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
          <TreeView {...tree} />;
          <ButtonPrimary onClick={handleCloseModal} label="Close" />
        </View>
      </Modal>
    </View>
  );
}

function TreeView(tree: Tree) {
  return (
    <View>
      {tree.folders.map((folder) => {
        return <Folder key={folder.id} {...folder} />;
      })}
      {tree.files.map((file) => {
        return <File key={file.id} {...file} />;
      })}
    </View>
  );
}

function Folder(folder: Tree) {
  const [showChildren, setShowChildren] = useState(false);
  return (
    <View>
      <h1 onClick={() => setShowChildren(!showChildren)}>{folder.name}</h1>
      {showChildren && <TreeView {...folder} />}
    </View>
  );
}
function File(file: File) {
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
