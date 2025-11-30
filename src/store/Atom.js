import {atom, selector} from 'recoil';

export const counterAtom = atom({
    key:'counterAtom',
    default:0
});

//할일 목록 정의
export const todoAtom = atom({
    key:'todosAtom',
    default:[
        {
            id:1,
            title:'경철아 화이팅',
            isDone:false
        }
    ]
});

export const todoLastIdSelector = selector({
    key:'todoLastIdSelector',
    get:({get}) => {
        //할 일 목록 마지막 할 일 가져오기
        const todo = get(todoAtom);
        return todo.at(-1)?.id ?? 0;
    }
})