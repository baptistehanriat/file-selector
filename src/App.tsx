import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonPrimary from "./components/cta/ButtonPrimary";
import FileSelector from "./components/file-selector/FileSelector";
import { Folder, File } from "./components/file-selector/types";
import View from "./components/layout/View";
import { P1 } from "./components/style/texts";

//TODO:
// - [x] The Overlay can be triggered by different buttons and places within the app
// - [x] Disable or hide files that do not have the type JPG, PNG, PDF
// - [x] A folder can not be selected, as it navigates to a new folder
// - [x] The arrow pointing to the left navigates to the parent folder of the current folder
// - [x] The title shows the current Folder name
// - [x] The X aborts the folder and clears the selection
// - [x] Files can be selected across multiple folders
// - [x] The amount of files selected is shown within the button
// - The list of folder and filters is scrollable, and starts below the Title and stops above the Button area
// - [x] Files and folder have the same hover and pressed states
// - [x] The Overlay should support to be opened with the selected items marked
// - [x] Clicking a file toggles adds and removes it from the selection.
// - [x] The list is updated with pressing the Add button
// - filename should be cut if too long
// - make view scrollable if too much content
// - error view if data not properly fetch

function App() {
  const dataUrl = "https://api-dev.reo.so/api/folderStructure";

  const [showFileSelector, setShowFileSelector] = useState(false);
  const [rootFolder, setRootFolder] = useState<Folder>();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [fetchStatus, setFetchStatus] = useState<
    "loading" | "success" | "error"
  >("loading");

  useEffect(() => {
    axios
      .get(dataUrl)
      .then((response) => {
        console.log(response.data);
        setRootFolder(response.data);
        setFetchStatus("success");
      })
      .catch((error) => {
        console.log(error);
        setFetchStatus("error");
      });
  }, []);

  function handleCloseFileSelector() {
    setShowFileSelector(false);
  }

  function saveSelection(files: File[]) {
    setSelectedFiles(files);
  }

  return (
    <Container>
      <ButtonPrimary
        onClick={() => setShowFileSelector(true)}
        label="Select Files"
      />
      {rootFolder && (
        <FileSelector
          open={showFileSelector}
          handleClose={handleCloseFileSelector}
          selection={selectedFiles}
          count={selectedFiles.length}
          rootFolder={rootFolder}
          saveSelection={saveSelection}
        />
      )}
      <P1>File Selected: {selectedFiles.length}</P1>
      {selectedFiles.map((file) => {
        return <P1 key={file.id}>{file.name}</P1>;
      })}
    </Container>
  );
}

const Container = styled(View)`
  flex: 1;
  margin-top: 200px;
  justify-content: center;
  align-items: center;
`;

export default App;
