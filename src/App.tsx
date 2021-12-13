import React, { useEffect, useState } from "react";
import ButtonPrimary from "./components/cta/ButtonPrimary";
import View from "./components/layout/View";
import Modal from "@mui/material/Modal";
import styled from "styled-components";
import axios from "axios";

interface Tree {
  folders: Folder[];
  files: File[];
}

interface File {
  name: string;
  id: string;
}

interface Folder {
  folders: Folder[];
  name: string;
  id: string;
  files: File;
}

function App() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const dataUrl = "https://api-dev.reo.so/api/folderStructure";

  const [folderStructure, setFolderStructure] = useState<Tree>();

  useEffect(() => {
    axios.get(dataUrl).then((response) => {
      setFolderStructure(response.data);
    });
  }, []);

  if (!folderStructure) return null;

  console.log(folderStructure.folders[1].folders);

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
          {/* <h4>{JSON.stringify(folderStructure)}</h4> */}
          {/* <Tree data={structure} />s */}
          {folderStructure.folders.map((folder) => {
            return <h1 key={folder.id}>{folder.name}</h1>;
          })}
          {folderStructure.files.map((file) => {
            return <h1 key={file.id}>{file.name}</h1>;
          })}
          <ButtonPrimary onClick={handleCloseModal} label="Close" />
        </View>
      </Modal>
    </View>
  );
}

// const TreeRecursive = ({ data }) => {
//   // loop through the data
//   return data.map((item) => {
//     // if its a file render <File />
//     if (item.type === "file") {
//       return <File {item.name} />;
//     }
//     // if its a folder render <Folder />
//     if (item.type === "folder") {
//       return (
//         <Folder name={item.name}>
//           {/* Call the <TreeRecursive /> component with the current item.childrens */}
//           <TreeRecursive data={item.childrens} />
//         </Folder>
//       );
//     }
//   });
// };

// const Collapsible = styled.div`
//   /* set the height depending on isOpen prop */
//   height: ${(isOpen) => (isOpen ? "auto" : "0")};
//   /* hide the excess content */
//   overflow: hidden;
// `;

// const StyledFolder = styled.div`
//   padding-left: 20px;

//   .folder--label {
//     display: flex;
//     align-items: center;
//     span {
//       margin-left: 5px;
//     }
//   }
// `;

// const Folder = (name: string, children: React.ReactNode) => {
//   const [isOpen, setIsOpen] = useState(false);

//   const handleToggle = (e: any) => {
//     e.preventDefault();
//     setIsOpen(!isOpen);
//   };
//   return (
//     <StyledFolder>
//       <div className="folder--label" onClick={handleToggle}>
//         <span>{name}</span>
//       </div>
//       <Collapsible isOpen={isOpen}>{children}</Collapsible>
//     </StyledFolder>
//   );
// };

function Tree(children: React.ReactNode) {
  return <StyledTree>{children}</StyledTree>;
}

const StyledTree = styled.div`
  line-height: 1.5;
`;

function File(name: string) {
  return (
    <StyledFile>
      <h1>{name}</h1>
    </StyledFile>
  );
}

const StyledFile = styled.div`
  padding-left: 20px;
  display: flex;
  align-items: center;
  span {
    margin-left: 5px;
  }
`;

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

function FileSelector() {
  return (
    <View style={{ width: 500, height: 500, backgroundColor: "red" }}></View>
  );
}
export default App;
