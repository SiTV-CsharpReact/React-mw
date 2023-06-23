import React from "react"
type Props = {
    Title ?: string,
    Options ? :any[],
    ChangeFuncion ? : any
}
const SelectAction = ({Title,Options,ChangeFuncion} : Props)=>{
    
    const onChangeSelect = (e:any)=>{
        ChangeFuncion(e.target.value)
    }
    return  <div>
         <label htmlFor="">{Title} </label>
                <select name="" id="" onChange={(e)=>onChangeSelect(e)} >
                    {Options? Options.map((e)=>{
                        return (
                            <option value={e.value}  selected={e.selected ? true : false}> {e.label} </option>
                        )
                    }) :""}      
                 </select>
             </div>
}
export default SelectAction