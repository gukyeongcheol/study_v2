import { forwardRef, useImperativeHandle, useRef } from "react";

const MyTextBox = forwardRef(({label}, ref) => {
    //텍스트 상자에 대한 참조 준비
    const input = useRef(null);

    //부모 컴포넌트에 노출할 객체를 생성
    useImperativeHandle(ref,() =>{
        return{
            focus(){
                input.current.focus();
            }
        }                    
    },[]);

    return(
        <label>
            {label}:
            <input type="text" size="15" ref={input}></input>
        </label>   
    )    
});

export default MyTextBox;

