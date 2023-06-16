import  React ,{FC} from "react" 
import "./style.Form.scss";
type Props = {
    children :any,
    data :any
}
const FromAction  = ({data,children}:Props)=>{
    const HandelSubmit = (e:any)=>{
        e.preventDefault();
        console.log("Lưu ", data)
    }
    return <div> 
            <form className="FromAction" onSubmit={(e)=>HandelSubmit(e)}>
                <div className="From_grup"> {children} </div>
                <div>
                     <button className="btn" id="btn-cn"> Cập nhật </button>
                 </div>
            </form>
            </div>
}
export default FromAction