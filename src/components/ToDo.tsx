import { useSetRecoilState } from "recoil";
import { IToDo, toDoState } from "../atoms";

function ToDo({text, category, id}:IToDo){
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event:React.MouseEvent<HTMLButtonElement>)=>{
    

 
  // console.log("i wanna do", event.currentTarget.name);
  const {currentTarget:{name},}= event;
  console.log("i wanna do", name);
  setToDos((prev)=>{
    const targetIndex = prev.findIndex(toDo =>toDo.id === id);
    const oldToDo = prev[targetIndex];
    const newToDo = {text, id, category:name as any}
    console.log(oldToDo, newToDo);
    return [...prev.slice(0, targetIndex), newToDo, ...prev.slice(targetIndex + 1)];
  })
  };
  return  <li>
    <span>{text} </span>
    {category !== "DOING" && <button name="DOING" onClick={onClick}>Doing</button> }
    {category !== "TO_DO" && <button name="TO_DO" onClick={onClick}>To Do</button> }
    {category !== "DONE" && <button name="DONE" onClick={onClick}>Done</button> }
   
   
 
    </li>;
}
export default ToDo;