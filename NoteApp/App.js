import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  ImageBackground,
} from "react-native";

export default function App() {
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const addNote = () => {
    if (note.trim() === "") return;
    setNotes([...notes, note]);
    setNote("");
  };

  const selectNote = (index) => {
    setNote(notes[index]);
    setSelectedIndex(index);
    setEditMode(true);
  };

  const updateNote = () => {
    const updatedNotes = [...notes];
    updatedNotes[selectedIndex] = note;
    setNotes(updatedNotes);
    setNote("");
    setEditMode(false);
  };

  const cancelEdit = () => {
    setNote("");
    setEditMode(false);
  };

  const openDeleteModal = (index) => {
    setSelectedIndex(index);
    setModalVisible(true);
  };

  const deleteNote = () => {
    const newNotes = notes.filter((_, i) => i !== selectedIndex);
    setNotes(newNotes);
    setModalVisible(false);
  };

  return (
    <ImageBackground
      source={require("./assets/Background.jpg")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>My Notes</Text>

        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            placeholder={editMode ? "Edit your note..." : "Write your note..."}
            placeholderTextColor="#8b7d6b"
            value={note}
            onChangeText={setNote}
          />

          {editMode ? (
            <View style={styles.editButtonsColumn}>
              <TouchableOpacity style={styles.updateBtn} onPress={updateNote}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelBtn} onPress={cancelEdit}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <TouchableOpacity style={styles.addBtn} onPress={addNote}>
              <Text style={styles.buttonText}>Add Note</Text>
            </TouchableOpacity>
          )}
        </View>

        <FlatList
          data={notes}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 50 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              style={styles.noteCard}
              onPress={() => selectNote(index)}
              onLongPress={() => openDeleteModal(index)}
            >
              <Text style={styles.noteText}>{item}</Text>
            </TouchableOpacity>
          )}
        />

        <Modal transparent animationType="fade" visible={modalVisible}>
          <View style={styles.modalBackground}>
            <View style={styles.modalBox}>
              <Text style={styles.modalTitle}>Delete Note</Text>
              <Text style={styles.modalText}>
                Are you sure you want to delete this note?
              </Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity
                  style={styles.modalCancel}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.modalCancelText}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.modalDelete}
                  onPress={deleteNote}
                >
                  <Text style={styles.modalDeleteText}>Delete</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    backgroundColor: "rgba(245,240,225,0.9)", 
    padding: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#4b3b2a",
    marginBottom: 20,
    textAlign: "center",
  },

  inputRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 20,
  },

  input: {
    flex: 1,
    backgroundColor: "#ecd8c5", 
    padding: 14,
    borderRadius: 12,
    color: "#4b3b2a",
    fontSize: 16,
    marginRight: 10,
  },

  addBtn: {
    backgroundColor: "#b78550",
    paddingVertical: 14,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  editButtonsColumn: {
    flexDirection: "column",
    justifyContent: "flex-start",
  },

  updateBtn: {
    backgroundColor: "#a76d3a",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 5,
  },

  cancelBtn: {
    backgroundColor: "#d4b996",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fffaf0",
    fontWeight: "600",
    fontSize: 16,
  },

  noteCard: {
    backgroundColor: "#ecd8c5",
    padding: 16,
    borderRadius: 12,
    marginTop: 10,
    shadowColor: "#4b3b2a",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  noteText: {
    color: "#4b3b2a",
    fontSize: 16,
  },

  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: 300,
    backgroundColor: "#f5f0e1",
    padding: 25,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#b78550",
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#4b3b2a",
    marginBottom: 10,
  },

  modalText: {
    color: "#4b3b2a",
    marginBottom: 20,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  modalCancel: {
    padding: 10,
  },

  modalCancelText: {
    color: "#a76d3a",
    fontWeight: "700",
  },

  modalDelete: {
    padding: 10,
  },

  modalDeleteText: {
    color: "#b78550",
    fontWeight: "700",
  },
});