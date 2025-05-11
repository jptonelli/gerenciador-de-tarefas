import Tasks from "./components/Tasks"
import AddTask from "./components/AddTask"
import { useEffect, useState } from "react"
import { v4 } from "uuid"
import Title from "./components/Title";

function App() {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  // UseEffect() -> Recebe dois valores, uma função e uma lista. Sempre que o valor da lista for alterado, a função será executada

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  // Essa é a estrutura de um useEffect que só é executado uma única vez, que é quando o usuário acessa a aplicação
  useEffect(() => {
    async function fetchTasks() {
      // Chamar a API
      const response = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10", {
        method: "GET"
      });

      // PEGAR OS DADOS QUE ELA RETORNA
      const data = await response.json()
      console.log(data)

      // ARMAZENAR O RETORNO NO STATE
      setTasks(data)
    }

    // SE QUISER PODEMOS DESCOMENTAR ABAIXO PARA PEGAR AS TAREFAS VIA API
    //fetchTasks()
  }, [])

  function onTaskClick(taskId) {
    const newTasks = tasks.map(task => {
      if (taskId === task.id) {
        return { ...task, isCompleted: !task.isCompleted }
      }

      return task;
    })

    setTasks(newTasks)
  }

  function deleteTaskClick(taskId) {
    const newTasks = tasks.filter(task => task.id != taskId)
    setTasks(newTasks)
  }

  function onAddTaskSubmit(title, description) {
    const newTask = {
      id: v4(),
      title: title,
      description: description,
      isCompleted: false,
    }

    setTasks([...tasks, newTask]) // Todas as tarefas anteriores e a nova criada
  }

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <Title>Gerenciador de Tarefas</Title>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks tasks={tasks} onTaskClick={onTaskClick} deleteTaskClick={deleteTaskClick} />
        {/* Isso é uma props, usada para passar o valor do state para o componente */}
      </div>
    </div>
  )
}

export default App;