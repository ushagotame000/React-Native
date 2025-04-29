import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";

export default function HomeScreen() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<string[]>([]);

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const storedTodos = await AsyncStorage.getItem("todos");
        if (storedTodos) {
          setTodos(JSON.parse(storedTodos));
        }
      } catch (error) {
        console.error("Failed to load todos from AsyncStorage", error);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    const saveTodos = async () => {
      try {
        await AsyncStorage.setItem("todos", JSON.stringify(todos));
      } catch (error) {
        console.error("Failed to save todos to AsyncStorage", error);
      }
    };

    saveTodos();
  }, [todos]);

  const addTodo = () => {
    if (todo.trim() === "") return;
    setTodos((prevTodos) => [...prevTodos, todo]);
    setTodo("");
  };

  const deleteTodo = (index: number) => {
    const updatedTodos = todos.filter((_, i) => i !== index);
    setTodos(updatedTodos);
  };

  const editTodo = (index:number)=>{
    setTodo(todos[index]);
    const newTodos= todos.filter((_,i) => i !== index);
    setTodos(newTodos);
  }
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Todo</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Add a new todo"
          placeholderTextColor="#ccc"
          multiline={true}
          value={todo}
          onChangeText={setTodo}
        />
        <TouchableOpacity style={styles.button} onPress={addTodo}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={todos}
        renderItem={({ item, index }) => (
          <View style={styles.todoItem}>
            <Text style={styles.todoText}>{item}</Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.edit} onPress={() => editTodo(index)}>
                <Text style={styles.actionText}>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.delete}
                onPress={() => deleteTodo(index)}
              >
                <Text style={styles.actionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
        contentContainerStyle={styles.todoList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 40,
    fontWeight: "500",
    color: "#0818A8",
    fontFamily: "Winky-semiBold",
    marginBottom: 20,
    textAlign: "center",
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    textAlign: "center",
    color: "black",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    fontSize: 20,
    marginBottom: 15,
  },
  button: {
    width: "100%",
    backgroundColor: "#008080",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontFamily: "Winky-semiBold",
  },
  todoItem: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 7,
    marginBottom: 10,
    flexDirection: "column",
  },
  todoText: {
    fontSize: 30,
    color: "white",
    fontFamily: "Winky-light",
    marginBottom: 10,
    margin: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  edit: {
    backgroundColor: "green",
    borderRadius: 5,
    paddingHorizontal: 40,
    paddingVertical: 10,
  },
  delete: {
    backgroundColor: "red",
    borderRadius: 5,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  actionText: {
    fontSize: 20,
    color: "white",
    fontFamily: "Winky-semiBold",
  },
  todoList: {
    paddingBottom: 50,
  },
});
