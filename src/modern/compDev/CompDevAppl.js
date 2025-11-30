import { Suspense, Profiler, useState, useEffect} from "react";
import { createPortal } from "react-dom";
import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import styled from 'styled-components';
import PanelBase from './StyledCommon.css';
import './PortalBasic.css';

export const SuspenseSimple = () => {
    return (
        <Suspense fallback={<p>Now Loading...</p>}>          
            <h4>▶ 비동기 처리 종료 기다리기-Suspense 컴포넌트</h4>
            <ThrowResult></ThrowResult>
        </Suspense>
    )
}

/* case 1 ------------------------------------------------------ */
let flag = false;   //Promise가 종료되었는지 여부를 나타내는 플래그 변수

const ThrowPromise = () => {
    //Promise가 완료되면 원래의 결과를 표시한다.
    if(flag){
        return <p>올바르게 표시되었다</p>
    }    

    throw new Promise((resolve, reject) => {
        //3000밀리초 후에 해결하는 처리
        setTimeout(() => {
            flag = true;
            resolve('Susccess!!');
        },1000);
    });
}
/* case 2 ------------------------------------------------------ */
const wrapPromise = (promise) => {
    //Promise 상태관리(pending, fullfilled, rejected)
    let status = 'pending';

    //Promise에서 받은 데이터
    let data;

    let wrapper = promise.then(
        //성공시 status를 fulfilled(성공), data에 취득한 데이터를 설정
        result => {
            status = 'fulfilled';
            data = result;
        },
        //실패시 status를 rejected(실패), data에 에러 객체를 생성
        e => {
            status = 'rejected';
            data = e
        }
    );

    return {
        get(){
            switch(status){
                case 'fulfilled':
                    return data;    //성공시 실제 데이터를 반환
                case 'rejected':
                    throw data;    //실패시 에러 발생
                case 'pending':
                    return wrapper; //완료하기 전에 Promise를 throw
                default:
                    break;
            }
        }
    }
}

const getInfo = () => {
    return wrapPromise(new Promise((resolve, reject) => {
        //2000밀리초 후 50% 확률로 성공/실패 메시지를 생성
        setTimeout(() => {
            if(Math.random() > 0.5){
                resolve('Succeeded!!');
            }
            else{
                reject('Error!!');
            }
        }, 1000);
    }))
}

//Promise의 상태를 관리하는 객체를 가져옴
const info = getInfo();

//Promise의 상태에 따라 결과를 표시하는 컴포넌트
const ThrowResult = () => {
    const result = info.get();

    return <p>{result}</p>;
}
/////////////////////////////////
const sleep = (delay) => {
    let start = Date.now();
    while (Date.now() - start < delay);
}

// delay 밀리초 지연발생
const HeavyUI = ({delay}) =>{
    sleep(delay);
    return <p>지연 시간은 {delay}밀리초</p>;
}

export const ProfilerBasic = () => {
    //성능 측젇을 위한 함수(onRender 함수)
    const handleMeasure = (id, phase, actualDuration, baseDuration, startTime, endTime) => {
        console.log('id : ', id);
        console.log('phase : ', phase);
        console.log('actualDuration : ', actualDuration);
        console.log('baseDuration : ', baseDuration);
        console.log('startTime : ', startTime);
        console.log('endTime : ', endTime);        
    }

    return(
        <Profiler id="heavy" onRender={handleMeasure}>
            <hr></hr>
            <h4>▶ 컴포넌트 렌더링 시간 측정하기-Profiler 컴포넌트</h4>
            <HeavyUI delay={150}></HeavyUI>
            <HeavyUI delay={50}></HeavyUI>
            <HeavyUI delay={200}></HeavyUI>
        </Profiler>
    )
}
/////////////////////////////////
const MyPanel = styled.div`
width:600px;
padding:10px;
border:1px solid #000;
border-radius:5px;
background-color:royalblue;
color:white;
`;

export const StyledComp = () => {
    return(
        <>
            <hr></hr>
            <h4>▶ 표준 태그를 확장하여 스타일 태그 정의하기-Styled Components</h4>
            <MyPanel>표준 태그를 확장하여 스타일 태그 정의하기-Styled Components</MyPanel>
        </>        
    )
}
/////////////////////////////////
const MyButton = ({className, children}) => {
    return(
        <button type="button" className={className}>{children}</button>
    )
}

//MyButton에 스타일을 부여한 MyStyledButton을 정의한다
const MyStyledButton = styled(MyButton)`
display:block;
background-color:royalblue;
color:white;
font-weight:bold;
width:80px;
height:50px;
`;

export const MyStyledButtonWrap = () => {
    return(
        <>
            <hr></hr>
            <h4>▶ 기존 컴포넌트에 스타일 지정하기</h4>
            <MyButton>버튼</MyButton>
            <MyStyledButton>버튼</MyStyledButton>
        </>
    )
};
/////////////////////////////////
const MyPanel2 = styled.div`
${PanelBase}
width:600px;
padding:10px;
border:1px solid #000;
border-radius:5px;
background-color:royalblue;
color:white;
`;

export const StyledCommon = () => {
    return(
        <>
            <hr></hr>
            <h4>▶ 스타일 정의 외부화하기</h4>
            <MyPanel2>스타일 정의 외부화하기</MyPanel2>
        </>
    )
}
/////////////////////////////////
const MyPanel3 = styled.div`
width:600px;
padding:10px;
border:1px solid #000;
color:white;
border-radius:${props => (props.theme.radius ? '10px':'0px')};
background-color:${props => props.theme.color};
`;

export const StyledProps = ({theme}) => {
    return (
        <>
            <hr></hr>
            <h4>▶ Props를 통해 동적 스타일 설정하기</h4>
            <MyPanel3 theme={{
                radius:true,
                color:'royalblue'
            }}>Props를 통해 동적 스타일 설정하기</MyPanel3>
        </>
    )
}
/////////////////////////////////
export const PortalBasic = () => {
    //다이얼로그 창의 개폐 상태를 나타내는 State(false로 닫힌 상태)
    const [show, setShow] = useState(false);

    //버튼 클릭시 핸들러(State 켜기/끄기)
    const handleDialog = () => setShow(s => !s);

    //팝업 on/off 시 body에 overlay-active 클래스 토글
    useEffect(() => {
        const body = document.body;

        if(show){
            body.classList.add("overlay-active");            
        }
        else{
            body.classList.remove("overlay-active");
        }

        //컴포넌트 언마운트 시 cleanup
        return () => body.classList.remove("overlay-active");
    }, [show]);

    return(
        <>
            <hr></hr>
            <h4>▶ 컴포넌트 하위의 콘텐츠를 임의의 영역에 렌더링하기-포털</h4>
            <form>
                <button type="button" onClick={handleDialog} disabled={show}>다이얼로그 표시</button>
                {show && createPortal(
                    <div className="overlay">
                        <div className="dialog">
                            <p>Portal에서 생성된 대화상자</p>
                            <button type="button" onClick={handleDialog}>닫기</button>
                        </div>
                    </div>,
                    document.getElementById('dialog')
                )}
            </form>
        </>
    )
}
/////////////////////////////////
const ErrorThrow = () => {
    //무조건 예외 발생
    //throw new Error('Error is occured in MyApp.');

    return(
        <p>잘 실행되었다.</p>
    )
};

export const ErrorRoot = () => {
    return (
        <>
            <hr></hr>
            <h4>▶ Error Boundary의 기본</h4>            
            <ErrorBoundary onError={err => alert(err.message)} fallback={<div>오류가 발생했다.</div>}>
                <ErrorThrow></ErrorThrow>
            </ErrorBoundary>
        </>
    )
}
/////////////////////////////////
const ErrorRetryThrow = () => {
    // 60%의 확률로 오류 발생
    if(Math.random() < 0){
        throw new Error('Error is occured in MyApp.');
    }

    return(
        <p>잘 실행되었다.</p>
    )
}

export const ErrorRetryRoot = () => {
    //오류 발생시 실행되는 처리
    const handleFallback = ({error, resetErrorBoundary}) => {
        const handleClick = () => resetErrorBoundary();

        return(
            <div>
                <h4>다음 오류가 발생했다</h4>
                <p>{error.message}</p>
                <button type="button" onClick={handleClick}>Retry</button>
            </div>
        )
    };

    const handleReset = () => console.log('Retry!!');

    return(
        <>
            <hr></hr>
            <h4>▶ Error Boundary의 기본-상세오류내용</h4>  
            <ErrorBoundary onReset={handleReset} fallbackRender={handleFallback}>
                <ErrorRetryThrow></ErrorRetryThrow>
            </ErrorBoundary>
        </>
    )
}
/////////////////////////////////
const ErrorFallback = ({error, resetErrorBoundary}) => {
    const handleClick = () => resetErrorBoundary();

    return(
        <div>
            <h4>다음 오류가 발생했다</h4>
            <p>{error.message}</p>
            <button type="button" onClick={handleClick}>Retry</button>
        </div>
    )
}

const ErrorRetryThrow2 = () => {
    // 60%의 확률로 오류 발생
    if(Math.random() < 0){
        throw new Error('Error is occured in MyApp.');
    }

    return(
        <p>잘 실행되었다.</p>
    )
}

export const ErrorRetryRootComp = () => {
   
    const handleReset = () => console.log('Retry!!');

    return(
        <>
            <hr></hr>
            <h4>▶ Error Boundary의 기본-상세오류내용(대체 콘텐츠를 컴포넌트로 잘라내기)</h4>  
            <ErrorBoundary onReset={handleReset} FallbackComponent={ErrorFallback}>
                <ErrorRetryThrow2></ErrorRetryThrow2>
            </ErrorBoundary>
        </>
    )
}
/////////////////////////////////
const ErrorEvent = () => {
    const {showBoundary} = useErrorBoundary();

    const handleClick = () => {
        try{
            throw new Error('Error is occured in MyApp.');
        }
        catch(e){
            //핸드러 내에서 발생한 예외를 Error Boundary로 넘긴다.
            showBoundary(e);
        }
    };

    return(
        <button type="button" onClick={handleClick}>오류 발사</button>
    )
}

export const ErrorEventRoot = () => {
    //오류 발생시 실행되는 처리
    const handleFallback = ({error, resetErrorBoundary}) => {
        const handleClick = () => resetErrorBoundary();

        return(
            <div>
                <h4>다음 오류가 발생했다</h4>
                <p>{error.message}</p>
                <button type="button" onClick={handleClick}>Retry</button>
            </div>
        )
    };

    const handleReset = () => console.log('Retry!!');

    return(
        <>
            <hr></hr>
            <h4>▶ 이벤트 핸들러에서 발생하는 예외를 Error Boundary로 처리하기</h4> 
            <ErrorBoundary onReset={handleReset} fallbackRender={handleFallback}>
                <ErrorEvent></ErrorEvent>
            </ErrorBoundary>
        </>
    )
}
