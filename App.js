import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [enteredGoal, setEnteredGoal] = useState("");
  const [goals, setGoals] = useState([]);
  const [editingId, setEditingId] = useState(null);

  function addOrUpdateGoalHandler() {
    if (enteredGoal.trim().length === 0) return;

    if (editingId) {
      // Update mode
      setGoals((currentGoals) =>
        currentGoals.map((goal) =>
          goal.id === editingId ? { ...goal, text: enteredGoal } : goal
        )
      );
      setEditingId(null);
    } else {
      // Add mode
      setGoals((currentGoals) => [
        ...currentGoals,
        { text: enteredGoal, id: Math.random().toString() },
      ]);
    }

    setEnteredGoal("");
  }

  function deleteGoalHandler(id) {
    setGoals((currentGoals) =>
      currentGoals.filter((goal) => goal.id !== id)
    );
  }

  function startEditHandler(id, text) {
    setEnteredGoal(text);
    setEditingId(id);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter your goal"
          value={enteredGoal}
          onChangeText={setEnteredGoal}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={addOrUpdateGoalHandler}
        >
          <Text style={styles.addButtonText}>
            {editingId ? "UPDATE" : "ADD"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={goals}
        keyExtractor={(item) => item.id}
        renderItem={(itemData) => (
          <View style={styles.goalItem}>
            <Text style={styles.goalText}>
              {itemData.item.text}
            </Text>

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.editButton}
                onPress={() =>
                  startEditHandler(
                    itemData.item.id,
                    itemData.item.text
                  )
                }
              >
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() =>
                  deleteGoalHandler(itemData.item.id)
                }
              >
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 20,
    backgroundColor: "#F5F5F5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#6A1B9A",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  textInput: {
    borderWidth: 1,
    borderColor: "#6A1B9A",
    width: "65%",
    padding: 10,
    borderRadius: 5,
  },
  addButton: {
    backgroundColor: "#6A1B9A",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  goalItem: {
    backgroundColor: "#6A1B9A",
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
  },
  goalText: {
    color: "white",
    marginBottom: 8,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#3949AB",
    padding: 6,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: "#D32F2F",
    padding: 6,
    borderRadius: 5,
  },
  actionText: {
    color: "white",
    fontWeight: "bold",
  },
});