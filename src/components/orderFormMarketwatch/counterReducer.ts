export interface CounterState {
    data: number;
}
const initialState: CounterState ={
    data:42
}
export default function counterReducer(state= initialState, aciton:any){
    return state.data;
}