import React, { useState } from "react";
import ButtonPrimary from "./components/cta/ButtonPrimary";
import View from "./components/layout/View";
import Modal from "react-modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        marginTop: 200,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ButtonPrimary
        onClick={() => {
          setIsModalOpen(true);
        }}
        label="Select Files"
      />
      <Modal
        isOpen={isModalOpen}
        contentLabel="Example Modal"
        shouldCloseOnOverlayClick={
          false
          /* Boolean indicating if the overlay should close the modal */
        }
        style={{
          overlay: {
            display: "flex",
            backgroundColor: "red",
          },
          content: {
            display: "flex",
            flex: 1,
            alignSelf: "center",
            height: "min-content",
            width: 500,
            borderRadius: "4px",
          },
        }}
      >
        <h1>This is my modal</h1>
      </Modal>
    </View>
  );
}

function FileSelector() {
  return (
    <View style={{ width: 500, height: 500, backgroundColor: "red" }}></View>
  );
}
export default App;
