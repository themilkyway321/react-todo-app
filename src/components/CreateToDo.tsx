import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
};

function CreateToDo(){
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  // const ToDos = useRecoilValue(toDoState);
  const {register, handleSubmit, setValue}= useForm<IForm>();
  const handleValid=({ toDo }:IForm)=>{
    setToDos((prev)=>[{text: toDo, id:Date.now(), category: category}, ...prev]);
    setValue("toDo", "");
    // localStorage.setItem("ToDos",JSON.stringify(ToDos));
    };
   
  return (
    
    <form onSubmit={handleSubmit(handleValid)}>
      <input  {...register("toDo",{required:"Please write a To Do"})} placeholder="Write a to do" />
      <button>Add</button>
    
    </form>

  );
}
export default CreateToDo;