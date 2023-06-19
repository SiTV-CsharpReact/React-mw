
type Props = {
  Title ? : string,
  ChangeFuncion ? :any
}
const InputAction = ({Title , ChangeFuncion} : Props) => {
  const ChangeInput = (e:any)=>{
       ChangeFuncion(e.target.value)
    
  }
  return <div>
        <label className="">{Title}</label>
            <input type="text" onChange={(e)=>ChangeInput(e)} />        
  </div>;
};
export default InputAction;
