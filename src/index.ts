import { v4 as uuidV4 } from "uuid";

type Task = {
  id: string
  title: string
  completed: boolean
  createdAt: Date
}

const list = document.querySelector<HTMLUListElement>("#list")
const form = document.getElementById("new-task-form") as HTMLFormElement | null
const input = document.querySelector<HTMLInputElement>("#new-task-title")

// define the task which from loadtask func
const tasks: Task[] = loadTasks()
tasks.forEach(addListItem)

// add func
form?.addEventListener("submit", e => {
  e.preventDefault()

  if (input?.value == "" || input?.value == null) return

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  }

  tasks.push(newTask)
  saveTasks()

  // when a listItem added, clean the input value.
  addListItem(newTask)
  input.value = ""
})

function addListItem(task: Task) {
  const item = document.createElement("li")
  const label = document.createElement("label")
  const checkbox = document.createElement("input")

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked
    saveTasks()
  })

  // add html type of the input as a checkbox.
  checkbox.type = "checkbox"
  checkbox.checked = task.completed
  label.append(checkbox, task.title)
  item.append(label)
  
  // to prevent error if the list is null.
  list?.append(item)
}

// save all task to local storage
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks))
}

// return all data as array type
function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS")
  if (taskJSON == null) return []
  return JSON.parse(taskJSON)
}