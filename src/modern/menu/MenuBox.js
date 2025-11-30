const ModernMenu = ({menuChgFunc}) => {
    const handlePickMenu = (e) => {      
        menuChgFunc(e.target.name);
    }

    return(
        <>
            <button id="compDevBasic" name="compDevBasic" onClick={handlePickMenu}>컴포넌트 개발(기본)</button>
            <button id="compDevForm" name="compDevForm" onClick={handlePickMenu}>컴포넌트 개발(폼)</button>
            <button id="compDevAppl" name="compDevAppl" onClick={handlePickMenu}>컴포넌트 개발(응용)</button>
            <button id="libUse" name="libUse" onClick={handlePickMenu}>라이브러리 활용하기</button>
            <button id="hkUse" name="hkUse" onClick={handlePickMenu}>훅 활용하기</button>
        </>
    )
}

export default ModernMenu;