import {atom, atomFamily, selector} from 'recoil';

// id 값 관리를 위한 Atom
export const idsAtom = atom({
    key:'idsAtom',
    default:[]
});

//개별 Todo 항목을 별도의 Atom으로 관리하기
export const todoAtom = atomFamily({
    key:'todoAtom',
    default:null
});

//할 일 항목을 목록으로 묶어 조작할 수 있는 선택기
export const todoListSelector = selector({
    key:'todoListSelector',
    //현재 할 일 목록 가져오기
    get:({get}) =>{
        const ids = get(idsAtom);
        return ids.map(id => get(todoAtom(id)));
    },
    set:({set, reset},{type, id, newItem}) => {
        switch(type){
            //새로운 Todo 항목(todoAtom)을 생성
            case 'add':
                set(todoAtom(newItem.id), newItem);
                set(idsAtom, ids => [...ids,newItem.id]);
                break;
            //기존 Todo 항목(id가 todoAtom인 Todo 항목)의 isDone 속성을 true로 설정
            case 'done':
                set(todoAtom(id), todo => ({...todo,isDone:true}));
                break;
            //기존 Todo 항목(id인 todoAtom) 삭제 및 id군(idsAtom)에서 해당 id 값을 삭제
            case 'remove':
                reset(todoAtom(id));
                set(idsAtom, ids => ids.filter(e => e !== id));
                break;
            default:
                throw new Error('Type is invalid');
        }
    }
})