import axios from "axios";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import ButtonPrimary from "./components/cta/ButtonPrimary";
import FileSelector from "./components/file-selector/FileSelector";
import { Folder, File } from "./components/file-selector/types";
import View from "./components/layout/View";

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

  function handleFileSelection(file: File) {
    if (selectedFiles.includes(file)) {
      const updatedSelectedFiles = selectedFiles.filter(
        (item) => item.id !== file.id
      );
      setSelectedFiles(updatedSelectedFiles);
    } else {
      const updatedSelectedFiles = [...selectedFiles, file];
      setSelectedFiles(updatedSelectedFiles);
    }
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
          handleSelection={handleFileSelection}
          selectedFiles={selectedFiles}
          count={selectedFiles.length}
          rootFolder={rootFolder}
        />
      )}
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
