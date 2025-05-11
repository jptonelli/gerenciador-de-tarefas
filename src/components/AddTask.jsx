import {useState} from "react"
import Input from "./input"

function AddTask({onAddTaskSubmit}){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");


    return (
        <div className="space-y bg-slate-400 p-6 rounded-md shadow flex flex-col">
            <Input 
                type="text" 
                placeholder="Digite o Título da Tarefa" 
                value ={title}
                onChange={(event) => setTitle(event.target.value)}
            />

            <Input 
                type="text" 
                placeholder="Descrição da Tarefa" 
                value={description}
                onChange={(event) => setDescription(event.target.value)}
            />

            <button 
                onClick={() => {
                    if (!title.trim() || !description.trim()){
                        return alert("Por favor, preencha todas as informações corretamente")
                    } 

                    onAddTaskSubmit(title, description)
                    setTitle("")
                    setDescription("")
                    
                }}
                className="bg-slate-500 rounded-md mt-4 text-white px-4 py-2 font-medium">
                    Adicionar Tarefa
            </button>
        </div>
    )
}

export default AddTask;