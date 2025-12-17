import { useTodoStore } from "../store/useTodoStore";
const { todos, addTodo } = useTodoStore();
useEffect(() => {
 addTodo({ id: 1, title: "Faire les courses" });
 addTodo({ id: 2, title: "Sortir le chien" });
 addTodo({ id: 3, title: "Coder une app RN" });
}, []);
