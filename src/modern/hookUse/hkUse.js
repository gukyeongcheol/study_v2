import { useEffect, useLayoutEffect, useState, useRef, useReducer, useContext, useMemo, useCallback} from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { counterAtom, todoAtom, todoLastIdSelector} from "../../store/Atom";
import { idsAtom, todoListSelector } from "../../store/AtomUp";
import { MyAppContext } from "../../common/Contxt";
import MyTextBox from './MyTextBox';
import './HookTimer.css';
import './StateTodo.css';
import {MyButton, MyCounter} from './HookMemoChild';

export const HookTimer = ({init}) => {
    const [count, setCount] = useState(init);

    useEffect(() => {
        //타이머 준비
        const t = setInterval(() => {
            setCount(c => c - 1);
        },1000);

        //컴포넌트 폐기시 타이머도 함께 폐기
        return (() => {
            clearInterval(t);
        })
    },[]);

    return(
        <>
            <h4>▶ 부작용 훅을 이용한 타이머 준비</h4>
            <div className={count < 0 ? 'warn':''}>
                현재 카운트 : {count}
            </div>
        </>
    )
}
/////////////////////////////////
//delay 초 동안 처리를 일시 정지하는 sleep 함수
const sleep = delay => {
    const start = Date.now();

    //현재 시간이 start(시작시간)를 초과할 때까지 루프 지속
    while(true){
        if(Date.now() - start > delay){break;}
    }
};

export const HookEffect = ({init}) => {
    const [count, setCount] = useState(0);

    //2000밀리초 후 State(count)를 설정한다.
    useLayoutEffect(() => {
        sleep(1000);
        setCount(init);
    },[]);

    return(
        //카운트가 0보다 작아지면 스타일 WARN 적용
        <>
            <hr></hr>
            <h4>▶ 렌더링 시 동기적으로 처리 수행하기</h4>
            <div className={count < 0 ? 'warn':''}>
                현재 카운트 : {count}
            </div>
        </>
    )
}
/////////////////////////////////
export const HookRefForward = () => {
    const text = useRef(null);

    //시작시 텍스트 상자에 포커스 맞추기
    useEffect(() => {      
        text.current?.focus();
    },[]);

    return(
        <>
            <hr></hr>
            <h4>▶ Ref를 컴포넌트 하위 요소로 전달(포워드)하기</h4>
            <MyTextBox label="name" ref={text}></MyTextBox>
        </>
        
    )
}
/////////////////////////////////
export const HookCallbackRef = () => {
    const [show, setShow] = useState();

    //버튼 클릭으로 표시/숨기기 반전
    const handleClick = () => setShow(!show);

    //[주소]란 참조
    const address = useRef(null);

    //[주소] 항목이 비어있지 않으면 포커스 이동
    useEffect(() => {
        if(address.current){
            address.current.focus();
        }
    },[show]);

    return(
        <>
            <hr></hr>
            <h4>▶ 콜백 함수를 ref 속성에 전달하기-콜백 ref</h4>
            <div>
                <label htmlFor="name">이름:</label>
                <input id="name" type="text"></input>
            </div>
            <div>
                <label htmlFor="email">이메일 주소:</label>
                <input id="email" type="text"></input>
                <button onClick={handleClick}>확장 표시</button>
            </div>
            {/* State(show) 값에 따라 [주소] 란을 표시 */}
            {show && 
                <div>
                    <label htmlFor="address">주소:</label>
                    <input id="address" type="text" ref={address}></input>
                </div>
            }
        </>
    )
}
/////////////////////////////////
export const HookCallbackRef2 = () => {
    const [show, setShow] = useState();

    //버튼 클릭으로 표시/숨기기 반전
    const handleClick = () => setShow(!show);

    //콜백 Ref 준비
    const callbackRef = elem => elem?.focus();

    return(
        <>
            <hr></hr>
            <h4>▶ 콜백 함수를 ref 속성에 전달하기-콜백 ref2</h4>
            <div>
                <label htmlFor="name">이름:</label>
                <input id="name" type="text"></input>
            </div>
            <div>
                <label htmlFor="email">이메일 주소:</label>
                <input id="email" type="text"></input>
                <button onClick={handleClick}>확장 표시</button>
            </div>
            {/* State(show) 값에 따라 [주소] 란을 표시 */}
            {show && 
                <div>
                    <label htmlFor="address">주소:</label>
                    <input id="address" type="text" ref={callbackRef}></input>
                </div>
            }
        </>
    )
}
/////////////////////////////////
export const HookReducer = ({init}) => {
    // State + Reducer 준비
    const [state, dispatch] = useReducer(
        // 증감,초기화 기능
        (state, action) => {
            switch(action.type){
                case 'update':
                    return {count : state.count + action.step};
                case 'reset':
                    return {count : action.init};
                default:
                    return state;
            }
        },
        //State의 초기값
        {
            count:init
        }
    );
    
    const handleUp = () =>{
        dispatch({type:'update',step:1});
    };
   
    const handleDown = () =>{
        dispatch({type:'update',step:-1});
    };
    
    const handleReset = () =>{
        dispatch({type:'reset',init:0});
    };

    return(
        <>
            <hr></hr>
            <h4>▶ useReducer 훅의 기초</h4>
            <button onClick={handleUp}>카운트 업</button>
            <button onClick={handleDown}>카운트 다운</button>
            <button onClick={handleReset}>카운트 리셋</button>
            <p>{state.count}번 클릭되었습니다</p>
        </>
    )
}
/////////////////////////////////
export const HookContextChildGrand = () => {
    const {title, lang} = useContext(MyAppContext);

    return(
        <>
            <hr></hr>
            <h4>▶ 컨텍스트의 기본</h4>
            <div>
                {title}({lang})
            </div>
        </>
    )
}
/////////////////////////////////
export const RecoilCounter = () => {
    //Recoil 관리하에 값과 세터를 가져온다
    const [counter, setCounter] = useRecoilState(counterAtom);   
    const handleClick = () => {
        setCounter(c => c+ 1);
    }
    const handleReset = () => {
        setCounter(0);
    }

    return(
        <>
            <hr></hr>
            <h4>▶ Recoil의 기본</h4>
            <button onClick={handleClick}>카운트</button>
            <button onClick={handleReset}>리셋</button>
            <p>{counter}번 클릭되었습니다</p>
        </>
    )
}
/////////////////////////////////
export const RecoilTodo = () => {
    const [title, setTitle] = useState('');

    //할 일 목록, 최대 id 값은 각각 Recoil에서 가져온다
    const [todo, setTodo] = useRecoilState(todoAtom);
    const maxId = useRecoilValue(todoLastIdSelector);

    const handleChangeTitle = e => setTitle(e.target.value);

    //[추가] 버튼으로 할 일 항목 추가하기
    const handleAdd = () => {
        setTodo([
            ...todo,
            {
                id:maxId + 1,
                title,
                isDone:false
            }
        ])
    }

    //[완료] 버튼으로 할 일 항목을 작업 완료로 표시
    const handleDone = e =>{
        setTodo(todo.map(item => {
            if(item.id === Number(e.target.dataset.id)){
                return{
                    ...item,
                    isDone:true
                }
            }
            else{
                return item;
            }
        }))
    }

    //[삭제] 버튼으로 할 일 항목 삭제
    const handleRemove = e => {
        setTodo(todo.filter(item => item.id !== Number(e.target.dataset.id)));
    }

    return(
        <>
            <hr></hr>
            <h4>▶ Todo 목록을 Recoil 앱에 대응하기</h4>
            <div>
                <label>
                    할 일:
                    <input type="text" name="todo" value={title} onChange={handleChangeTitle}></input>
                </label>
                <button type="button" onClick={handleAdd}>추가하기</button>
                <hr></hr>
                <ul>
                    {/* 할 일 목록을 순서대로 출력 */}
                    {todo.map(item => (
                        <li key={item.id} className={item.isDone ? 'done':''}>
                            {item.title}
                            <button type="button" onClick={handleDone} data-id={item.id}>완료</button>
                            <button type="button" onClick={handleRemove} data-id={item.id}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
/////////////////////////////////
export const RecoilTodoUp = () => {
    const [title, setTitle] = useState('');

    //Atom/Selector에서 값, 세터를 가져온다
    const [todo, setTodo] = useRecoilState(todoListSelector);
    const [ids, setIds] = useRecoilState(idsAtom);

    //텍스트 상자에 입력한 내용을 State에 반영
    const handleChangeTitle = e => {setTitle(e.target.value)};

    //[추가] 버튼 클릭으로 할 일 항목 추가하기
    const handleAdd = () => {
        //id 군의 최대값에서 다음 id값(+1)을 가져온다
        const newId = Math.max(...(ids.length ? ids:[0])) + 1;

        setTodo({
            type:'add',
            newItem:{
                id:newId,
                title,
                isDone:false
            }
        })
    };

    //[완료] 버튼 클릭으로 해당 Todo 항목을 작업 완료로 표시
    const handleDone = e => {
        setTodo({
            type:'done',
            id:Number(e.target.dataset.id)
        })
    };

    //[삭제] 버튼 클릭으로 해당 Todo 항목 삭제하기
    const handleRemove = e => {
        setTodo({
            type:'remove',
            id:Number(e.target.dataset.id)
        })
    };

    return(
        <>
            <hr></hr>
            <h4>▶ Todo 목록을 Recoil 앱에 대응하기-개선버전(atomFamily)</h4>
            <div>
                <label>
                    할 일:
                    <input type="text" name="todo" value={title} onChange={handleChangeTitle}></input>
                </label>
                <button type="button" onClick={handleAdd}>추가하기</button>
                <hr></hr>
                <ul>
                    {/* 할 일 목록을 순서대로 출력 */}
                    {todo.map(item => (
                        <li key={item.id} className={item.isDone ? 'done':''}>
                            {item.title}
                            <button type="button" onClick={handleDone} data-id={item.id}>완료</button>
                            <button type="button" onClick={handleRemove} data-id={item.id}>삭제</button>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
/////////////////////////////////
//인자 delay만 처리르 일시 정지하는 코드
const sleep2 = delay =>{
    const start = Date.now();

    while (Date.now() - start < delay);
}

export const HookMemo = () => {
    const [count1, setCount1] = useState(0);
    const [count2, setCount2] = useState(0);

    //MyButton에 넘겨주는 핸들러
    const increment = useCallback(() => setCount1(c => c + 1),[]);
    const decrement = useCallback(() => setCount2(c => c - 1),[]);

    //count1에 100을 더한 값을 계산하는 코드(더미 헤비 처리)
    const heavyProcess = useMemo(() => {
        sleep2(1000);

        return count1 + 100;
    },[count1]);

    return(
        <>
            <hr></hr>
            <h4>▶ 메모화를 위한 샘플</h4>
            {/* 값을 1씩 증가시키는 카운터 */}
            <div>
                <MyButton id="btn1" handleClick={increment}>카운트업</MyButton>
                <MyCounter id="c1" value={count1}></MyCounter> /             
                {heavyProcess}               
            </div>
            <div>
                {/* 값을 1씩 감소시키는 카운터 */}
                <MyButton id="btn2" handleClick={decrement}>카운트다운</MyButton>
                <MyCounter id="c2" vlaue={count2}></MyCounter>
            </div>
        </>
    )
}