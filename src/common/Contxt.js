import { createContext } from 'react';

//컨텍스트 초기화
export const MyAppContext = createContext({
    title:'React 입문',
    lang:'ko-KR'
});