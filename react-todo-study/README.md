## React Hook Form
npx create-react-app myApp --template typescript 혹은 npm install
npm i --save-dev @types/styled-components
npm i styled-components
npm i recoil
npm install react-hook-form

사용하기 쉬운 유효성 검사를 통해 성능이 뛰어나고 유연하며 확장 가능한 form입니다.

```
const {register,handleSubmit} = useForm();

input {...register('lastName', { required: true })}
```
https://react-hook-form.com

1. register 함수를 사용한다. 

register은 name, onBlur, onChange, onClick, ref를 return하는 함수

```<input {...register("category")}>``` 하면 register 함수가 반환하는 객체를 input의 props로 사용할 수 있음.

  1-1. 항목들에 대해 vaildation종류를 react-hook-form 에게 알려줄수 있다.

 - ```<input {...register("toDo", {required:true})} />``` required:true를 주는 것으로!  
required:true 대신 required:"You must write" 이런식으로 메시지를 써도 됌. 

    > 그럼 html속성인 ```<input required />```랑 뭐가 다를까?

    html은 사용자가가 f12개발자에서 required를 지우면, 문제를 없앨수있어. 하지만, input의 react-hook-form 형태로 조건을 주면, 에러가 난 곳으로 포커스를 자동으로 이동시켜주고, 사용자가 임의로 못 없애 

- 추가 내용은 Custom Validation 부분을 확인할 것! 




2. handleSubmit 함수를 사용한다. 

handleSubmit 이 수행될 때 Validation Check 해준다. 유효성 검사를 무사히 통과하면 handleSubmit이 받은 onValid함수를 실행해준다. 

3. formState
formState에 errors 객체가 있다. 

- console.log(formState.errors); 하면 에러를 보여준다. 
- 에러가 나는 곳으로 포커스를 자동으로 이동.  
```
 const { register, handleSubmit, formState:{errors} } =useForm<IForm>();
 ```
 이렇게 선언해주고,  이메일 input 이 에러가 났을 경우, 이메일 input에 있는 메시지를 보여준다. 

 ```
  <span>{errors?.email?.message as string}</span>
```          


4. defaultValues: form의 기본값을 설정해주는 함수 

```
  const { register, handleSubmit, formState:{errors} } =useForm<IForm>({
    defaultValues:{
      email:"@naver.com"},
  });
  ```
input에 대한 defaultValues는 사용자가 component와 상호 작용하기 전에 component가 처음 렌더링될 때 초기 값으로 사용됩니다.


5. setError

특정 요소에 대해 조건을 줘서 메시지를 출력하게 할 수 있다. 

혹은 폼 전체 메시지를 줄 수 있엄: ```setError("extraError",{message:"server offline."}```
```
 const { register, handleSubmit, formState:{errors},setError } =useForm<IForm>({
    defaultValues:{
      email:"@naver.com"},
  });
 const onValid = (data: IForm)=>{
    if (data.password !== data.password1){
      setError
        (
        "password1", 
        {message:"Passwords are not same"},
        {shouldFocus:true}
        );
      }
      // setError("extraError",{message:"server offline."})
    };

```

6. 이외 watch  

watch: (names?: string | string[] | (data, options) => void) => unknown
input의 변화를 구독합니다. 
watch: form의 입력값들의 변화를 관찰할 수 있게 해주는 함수
```
const { register, watch } =useForm();
  console.log(watch());
```



7. 이외 setValue
https://react-hook-form.com/api/useform/setvalue

setValue: (name: string, value: unknown, config?: Object) => void
필드 값을 업데이트
이 함수을 사용하면 등록된 필드의 값을 동적으로 설정하고 form state를 확인하고 업데이트하는 옵션을 가질 수 있습니다. 


유효성 검사를 통과하야 onValid 함수를 실행할때, email 인풋값을 비우기 
```
 const { register, handleSubmit, formState:{errors}, setValue } =useForm<IForm>();
  const onValid = (data:IForm)=>{
    console.log(data);
    setValue("email", "")
  };
  
```


8. 이외 reset 


reset: (values?: Record, options?: Record) => void
form state와 value 재설정
전체 form state 또는 form state의 일부를 재설정합니다.
```
reset() // form 전체 리셋
reset({ email: "" }); // form에서 특정 필드만 리셋
```
https://react-hook-form.com/api/useform/reset



9. 이외 React Hook Form (TypeScript)

React Hook Form은 TypeScript로 빌드되었으며, FormData 유형을 정의하여 form 값을 지원할 수 있습니다.
https://react-hook-form.com/get-started#TypeScript

```
interface IForm {
  email:string;
  firstName:string;
  lastName:string;
  username:string;
  password:string;
  password1:string;
};

const { register, setValue, handleSubmit, formState: { errors } } = useForm<IForm>();
```



## 코드 비교 

react-hook-form을 안쓰면 다음과 같은 코드
```
/* function ToDoList(){
  const [toDo, setToDO] =useState("");
  const [toDoError, setToDoError] =useState("");
  const onChange = (event:React.FormEvent<HTMLInputElement>)=> {
    const {
      currentTarget: { value },} =event;
      setToDoError("");
      setToDO(value)
    };
  const onSubmit =(event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    if(toDo.length <10){
      return setToDoError("To do should be longer")
    }else {
      console.log("submit")
    }
  };
  return (
  <div>
    <form onSubmit={onSubmit}>
      <input onChange = {onChange} value={toDo} type="text" placeholder="Write a to do" />
      <button>Add</button>
      {toDoError !==""? toDoError : null}
    </form>
  </div>
  );
} */
```


react-hook-form을 쓰면 다음과 같은 코드
```
function ToDoList(){
  const { register, handleSubmit, formState } =useForm();
  const onValid = (data:any)=>{
    console.log(data);
  };
  console.log(formState.errors);
  return (
    <div>
       <form onSubmit={handleSubmit(onValid)}>
        <input {...register("toDo", {required:true})} type="text" placeholder="Write a to do" />
        <input {...register("username", 
        {required:true, 
          minLength:{
           value:5,
           message: "your username is too short",
          }
        })} type="text" placeholder="Username" />
        
        <button>Add</button>
      </form>
    </div>
    );
}
```









```
import { useState } from "react";
import {useForm} from "react-hook-form";



interface IForm {
  email:string;
  firstName:string;
  lastName:string;
  username:string;
  password:string;
  password1:string;
};
function ToDoList(){
  const { register, handleSubmit, formState:{errors}, setValue } =useForm<IForm>();
  const onValid = (data:IForm)=>{
    console.log(data);
    setValue("email", "")
  };
  
  return (
    <div>
      <form style={{display:"flex", flexDirection:"column"}} onSubmit={handleSubmit(onValid)}>
        <input {...register("email", {
          required:"Email required",
          pattern:{
            value:/^[A-Za-z0-9._%+-]+@naver.com$/,
            message:"Only naver.com"
          },
          })} type="text" placeholder="Email" />
          <span>
          {errors?.email?.message as string}
          </span>
        <input {...register("firstName", {required:true})} type="text" placeholder="First Name" />
        <input {...register("lastName", {required:true})} type="text" placeholder="Last Name" />
        <input {...register("username", {required:true, minLength:{
           value:5,
           message: "Your username is too short",
        }})} type="text" placeholder="Username" />
        <span>
          {errors?.username?.message as string}
          </span>
        <input {...register("password", {required:true})} type="text" placeholder="Password" />
        <input {...register("password1", {required:"password is required"})} type="text" placeholder="Password1" />
        <button>Add</button>
      </form>
    </div>
    );
}
export default ToDoList;
```








##  Custom Validation

1. 문장의 조건(패턴) 정해주기 
```
    /^[A-Za-z0-9._%+-]+@naver.com$/
    ^ :문장의 시작
    [] : 문자셋 안의 아무문자
    + : 하나 또는 많이
```


```
 <input {...register("email", {
          required:"Email required",
          pattern:{
            value:/^[A-Za-z0-9._%+-]+@naver.com$/,
            message:"Only naver.com"
          },
          })} type="text" placeholder="Email" />
```        



2. 특정 단어 제외 validate

특정 단어가 포함되지 않도록 조건을 주는것. nico라는 단어가 포함되면 에러메시지 출력 

```
<input {...register(
          "username", {required:true, minLength:{
                value:5,
                message: "Your username is too short",
                },
                validate: (value) => value.includes("nico")? "no nico allowed":true,
            }
          )
          } type="text" placeholder="Username" />
        <span>
          {errors?.username?.message as string}
          </span>
```

조건이 여러개라면 객체로 줄수있어 

```
      <input
          {...register("firstName", {
            required: "write here",
            validate: {
              noNico: (value) =>
                value.includes("nico") ? "no nicos allowed" : true,
              noNick: (value) =>
                value.includes("nick") ? "no nick allowed" : true,
            },
          })}
          placeholder="First Name"
        />
        <span>{errors?.firstName?.message}</span>
```

3. minLength 혹은 maxLength도 활용할 수 있다. 

minLength만 적어줄수도 있고,  메시지도 같이 적어줄 수 있다. 
```
 <input {...register("username", {required:true, minLength:{
           value:5,
           message: "Your username is too short",
        }})} type="text" placeholder="Username" />
```        