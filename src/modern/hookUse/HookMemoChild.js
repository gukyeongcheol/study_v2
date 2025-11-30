import {memo} from 'react';

//카운터를 늘리거나 줄이는 버튼
export const MyButton = memo(({id, handleClick, children}) => {
    //리렌더링 시 로그
    console.log(`MyButton is callled: ${id}`);

    return(
        <button onClick={handleClick}>{children}</button>
    )
});

//카운터 값을 표시하기 위한 라벨
export const MyCounter = memo(({id,value}) => {
    //리렌더링 시 로그
    console.log(`MyCounter is called : ${id}`);

    return(
        <p>현재 값:{value}</p>
    )
});