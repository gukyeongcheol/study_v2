import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import './SelectStyle.css';
import './EventCompare.css';
import './EventPoint.css';
import './EventPropagation.css';

export const ForList = ({src}) => {
    return (
        <>
            <h2>※ 조건분기 및 반복 처리</h2>
            <h4>▶ 배열 나열하기-반복 처리</h4>
            <dl>
                {
                    src.map(elem => (
                        <Fragment key={elem.isbn}>
                            <dt>
                                <a href={`https://widibook.co.kr/images/cover/js/s/${elem.isbn}.jpg`}>
                                {elem.title} ({elem.price}원)
                                </a>
                            </dt>
                            <dd>{elem.summary}</dd>
                        </Fragment>
                    ))
                }
            </dl>
        </>       
    )
}
/////////////////////////////////
export const ForNest = ({src}) => {
    return (
        <>
            <hr></hr>
            <h4>▶ 목록 항목을 다른 구성 요소로 잘라내기</h4>
            <dl>
                {
                    src.map(elem => (
                        <ForItem book={elem} key={elem.isbn}></ForItem>
                    ))
                }
            </dl>
        </>        
    )
}
/////////////////////////////////
const ForItem = ({book}) => {
    let dd;

    if(book.download){
        dd = <dd>{book.summary}<Download slug={book.slug}></Download></dd>
    }
    else{
        dd = <dd>{book.summary}</dd>
    }

    return (
        <>
            <dt>
                <a href={`https://widibook.co.kr/images/cover/js/s/${book.isbn}.jpg`}>
                {book.title} ({book.price}원)
                </a>
            </dt>
            {dd}
        </>
    )
}

export const ForFilter = ({src}) => {
    const lowPrice = src.filter(e => e.price < 25000);

    return(
        <>       
            <hr></hr>    
            <h4>▶ 목록 필터링하기/정렬하기</h4>
            <dl>
                {
                    lowPrice.map(elem => (
                        <Fragment key={elem.isbn}>
                            <dt>
                                <a href={`https://widibook.co.kr/images/cover/js/s/${elem.isbn}.jpg`}>
                                {elem.title} ({elem.price}원)
                                </a>
                            </dt>
                            <dd>{elem.summary}</dd>
                        </Fragment>
                    ))
                }
            </dl>
        </>    
    )
}

const Download = ({slug}) => {
    return (
        <a href={`https://github.com/wikibook/${slug}`}>
            <img src="/img/dl.png" alt="Sample Download"></img>
        </a>
    )
}

/////////////////////////////////
export const ForSort = ({src}) => {
    src.sort((m,n) => m.price - n.price);

    return(
        <>       
            <hr></hr>    
            <h4>▶ 목록을 정렬하는 sort 메서드</h4>
            <dl>
                {
                    src.map(elem => (
                        <Fragment key={elem.isbn}>
                            <dt>
                                <a href={`https://widibook.co.kr/images/cover/js/s/${elem.isbn}.jpg`}>
                                {elem.title} ({elem.price}원)
                                </a>
                            </dt>
                            <dd>{elem.summary}</dd>
                        </Fragment>
                    ))
                }
            </dl>
        </>    
    )
}
/////////////////////////////////
export const SelectStyle = ({mode}) => {
    return (
        <>
            <hr></hr>    
            <h4>▶ 스타일 선택적으로 적용하기</h4>
            <div className={`box ${mode}`}>Hello World!!</div>
        </>        
    )
}
/////////////////////////////////
/*
PropTypes.string    문자열형
PropTypes.symbol    기호형
PropTypes.number    수치형
PropTypes.bool      지위형
PropTypes.array     배열(요소의 종류는 임의)
PropTypes.object    객체형(요소 유형은 임의)
PropTypes.func      함수형
PropTypes.element   React 요소
PropTypes.node      element, number, string, array 중 하나
PropTypes.any       임의의 유형
*/
const MyHello = (props) =>{
    return (
        <>
            <hr></hr>    
            <h4>▶ PropsTypes의 기본</h4>
            <div>안녕하세요, {props.myName}님!</div>
        </>
        
    )
}

//타입 정보 선언
MyHello.propTypes = {
    myName : PropTypes.string.isRequired
}

export default MyHello;
/////////////////////////////////
export const EventMouse = ({beforeSrc, afterSrc, alt}) => {
    const [current, setCurrent] = useState(beforeSrc);
    const handleEnter = () => setCurrent(afterSrc);
    const handleLeave = () => setCurrent(beforeSrc);

    return (
        <>
            <hr></hr>    
            <h4>▶ 마우스의 출입에 따라 이미지 교체</h4>
            <img src={current} alt={alt} onMouseEnter={handleEnter} onMouseLeave={handleLeave}></img>
        </>
    )
}
/////////////////////////////////
export const EventCompare = () => {
    const [result, setResult] = useState('');
    const handleIn = e => setResult(r => `${r}Enter : ${e.target.id}<br />`);
    const handleOut = e => setResult(r => `${r}Leave : ${e.target.id}<br />`);

    return (
        <>
            <hr></hr>    
            <h4>▶ onMouseEnter/onMouseLeave 와 onMouseOver/onMouseOut 의 차이점</h4>
            <div dangerouslySetInnerHTML={{__html:result}}></div>
            <div id="outer" onMouseOver={handleIn} onMouseOut={handleOut}>
                외부(outer)
                <p id="inner">내부(inner)</p>
            </div>
            
        </>
    )
}
/////////////////////////////////
export const EventError = ({src, alt}) => {
    const [path, setPath] = useState(src);
    const handleError = () => setPath("/img/noimage.jpg");

    return (
        <>
            <hr></hr>    
            <h4>▶ 이미지를 불러올 수 없는 경우 더미 이미지 표시하기</h4>
            <img src={path} alt={alt} onError={handleError}></img>
        </>
    )
}
/////////////////////////////////
export const EventPoint = () => {
    const [screen, setScreen] = useState({x:0,y:0});    //전체화면(데스크톱)
    const [page, setPage] = useState({x:0,y:0});        //전체 페이지
    const [client, setClient] = useState({x:0,y:0});    //브라우저가 현재 표시하고 있는 영역
    const [offset, setOffset] = useState({x:0,y:0});    //요소

    const handleMousemove = e => {
        setScreen({x:e.screenX, y:e.screenY});
        setPage({x:e.pageX, y:e.pageY});
        setClient({x:e.clientX, y:e.clientY});
        setOffset({x:e.nativeEvent.offsetX, y:e.nativeEvent.offsetY});        
    }

    return (
        <div id="main" onMouseMove={handleMousemove}>
            screen: {screen.x} / {screen.y}<br/>
            page: {page.x} / {page.y}<br/>
            client: {client.x} / {client.y}<br/>
            offset: {offset.x} / {offset.y}<br/>
        </div>
    )
}
/////////////////////////////////
export const EventKey = () =>{
    //Ctrl + q 로 도움말 메시지 표시
    const handleKey = e => {
        if(e.ctrlKey && e.key === 'q'){
            alert('이름은 20자 이내로 입력해 주세요.');
        }
    }

    return (
        <>
            <hr></hr>    
            <h4>▶ 키 이벤트에서 키 식별하기</h4>
            <form>
                <label>
                    이름:
                    <input type="text" size="20" onKeyDown={handleKey}></input>
                </label>
            </form>
        </>
    )
}
/////////////////////////////////
export const EventArgs = () => {
    //자체 인수를 추가한 이벤트 핸들러
    const current = (e, type) =>{
        const d = new Date();

        switch(type){
            case 'date':
                console.log(`${e.target.id}: ${d.toLocaleDateString()}`);
            break;
            case 'time':
                console.log(`${e.target.id}: ${d.toLocaleTimeString()}`);
            break;
            default:
                console.log(`${e.target.id}: ${d.toLocaleString()}`);
            break;
        }
    };

    return(
        <div>
            <hr></hr>    
            <h4>▶ 이벤트 핸들러에 임의의 인수를 전달</h4>
            {/* 화살표 함수를 통해 핸들러를 호출 */}
            <button id="dt" onClick={e => current(e, 'datetime')}>현재 날짜 및 시각</button>
            <button id="date" onClick={e => current(e, 'date')}>현재 날짜</button>
            <button id="time" onClick={e => current(e, 'time')}>현재 시각</button>
        </div>
    )
}
/////////////////////////////////
export const EventArgs2 = () => {
    
    const current = e =>{
        const type = e.target.dataset.type;
        const d = new Date();

        switch(type){
            case 'date':
                console.log(`${e.target.id}: ${d.toLocaleDateString()}`);
            break;
            case 'time':
                console.log(`${e.target.id}: ${d.toLocaleTimeString()}`);
            break;
            default:
                console.log(`${e.target.id}: ${d.toLocaleString()}`);
            break;
        }
    };

    return(
        <div>
            <hr></hr>    
            <h4>▶ 이벤트 핸들러에 임의의 인수를 전달(자체 데이터 속성 활용하기)</h4>
            {/* 화살표 함수를 통해 핸들러를 호출 */}
            <button id="dt" data-type="datetime" onClick={current}>현재 날짜 및 시각</button>
            <button id="date" data-type="date" onClick={current}>현재 날짜</button>
            <button id="time" data-type="time" onClick={current}>현재 시각</button>
        </div>
    )
}
/////////////////////////////////
export const EventPropagation = () => {
    const handleParent = () => alert('#parent run...');
    const handleMy = () => alert('#my run...');
    const handleChild = (e) => {
        e.stopPropagation();
        e.preventDefault();
        alert('#child run...');
    }

    return (
        <>
            <hr></hr>    
            <h4>▶ 이벤트 전파 방지</h4>
            <div id="parent" onClick={handleParent}>
                부모 요소
                <div id="my" onClick={handleMy}>
                    현재 요소
                    <a id="child" href="https://wikibook.co.kr" onClick={handleChild}>
                        자식 요소
                    </a>
                </div>
            </div>
        </>
    )
}
/////////////////////////////////
export const EventPropagation2 = () => {
    const handleParent = () => alert('#parent run...');
    const handleMy = () => alert('#my run...');
    const handleChild = (e) => {       
        e.preventDefault();
        alert('#child run...');
    }

    return (
        <>
            <hr></hr>    
            <h4>▶ 이벤트 전파 방지(처리순서 변경하기)</h4>
            <div id="parent" onClickCapture={handleParent}>
                부모 요소
                <div id="my" onClickCapture={handleMy}>
                    현재 요소
                    <a id="child" href="https://wikibook.co.kr" onClickCapture={handleChild}>
                        자식 요소
                    </a>
                </div>
            </div>
        </>
    )
}






