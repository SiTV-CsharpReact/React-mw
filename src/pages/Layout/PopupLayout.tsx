type Props = {
    children  : any,
    active: boolean,
    Function : any,
}
const PopupPage = ({children, active , Function} : Props)=>{

    return <> 
            <div > 
            <div className={`PopupPage ${active ? "activePopupPage" : ""}`}  onClick={()=>Function(!active)}>

            </div>
                    <div className={`${active ? "activePopupPage" : "acviveItmePoup"}`}> {children} </div>
             </div>
    </>
}
export default PopupPage