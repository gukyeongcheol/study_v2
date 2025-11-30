import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { yupResolver} from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {useImmer} from 'use-immer';
import '../compDev/StateTodo.css';

export const StateForm = () => {
    const [form, setForm] = useState({
        name:'홍길동',
        age:18
    });

    const handleForm = e => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    };

    const show = () => {
        console.log(`안녕하세요. ${form.name} (${form.age}세) 님!`);
    }

    return(
        <>          
            <h4>▶ 폼 관리의 기본</h4>
            <form>
            {/* 개별 폼 요소에 State 값 할당 */}
            <div>
                <label htmlFor="name">이름:</label>
                <input id="name" name="name" type="text" onChange={handleForm} value={form.name}></input>
            </div>
            <div>
                <label htmlFor="age">나이:</label>
                <input id="age" name="age" type="number" onChange={handleForm} value={form.age}></input>
            </div>
            <div>
                <button type="button" onClick={show}>보내기</button>
                <p>안녕하세요, {form.name} ({form.age}세) 님!</p>
            </div>
        </form>
        </>
        
    )
}
/////////////////////////////////
export const StateFormUC = () =>{
    const name = useRef(null);
    const age = useRef(null);

    const show = () => {
        console.log(`안녕하세요. ${name.current.value} (${age.current.value}세) 님!`);
    }

    return(
        <>
            <hr></hr>
            <h4>▶ 비제어 컴포넌트를 통한 폼 관리</h4>
            <form>
                {/* 준비된 레퍼런스를 각 요소에 연결 */}
                <div>
                <label htmlFor="name">이름:</label>
                <input id="name" name="name" type="text" ref={name} defaultValue="홍길동"></input>
            </div>
            <div>
                <label htmlFor="age">나이:</label>
                <input id="age" name="age" type="number" ref={age} defaultValue="19"></input>
            </div>
            <div>
                <button type="button" onClick={show}>보내기</button>             
            </div>
            </form>
        </>
    )
}
/////////////////////////////////
export const FormTextarea = () => {
    const [form, setForm] = useState({
        comment: `다양한 폼 요소를...`
    });

    const handleForm = e => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        });
    }

    const show = () => {
        console.log(`댓글: ${form.comment}`);
    };

    return(
        <>
            <hr></hr>
            <h4>▶ 입력 요소에 따른 폼 구현 예시(텍스트 영역)</h4>
            <form>
                <label htmlFor="comment">댓글:</label><br></br>
                <textarea id="comment" name="comment" cols="30" rows="7" value={form.comment} onChange={handleForm}></textarea><br></br>
                <button type="button" onClick={show}>보내기</button>
            </form>
        </>
    )
}
/////////////////////////////////
export const FormSelect = () =>{
    const [form, setForm] = useState({
        animal:"dog"
    });

    const handleForm = e => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    };

    const show = () =>{
        console.log(`좋아하는 동물:${form.animal}`);
    };

    return(
        <>
            <hr></hr>
            <h4>▶ 입력 요소에 따른 폼 구현 예시(선택 상자)</h4>
            <form>
                <label htmlFor="animal">좋아하는 동물:</label>
                <select id="animal" name="animal" value={form.animal} onChange={handleForm}>
                    <option value="cat">고양이</option>
                    <option value="dog">개</option>
                    <option value="hamster">햄스터</option>
                    <option value="rabbit">토끼</option>                   
                </select>
                <button type="button" onClick={show}>보내기</button>
            </form>
        </>
    )
}
/////////////////////////////////
export const FormMultiSelect = () => {
    const [form, setForm] = useState({
        animal:['dog','hamster']
    });

    const handleFormList = e =>{
        const data = [];

        //<option> 요소를 순차적으로 스캔하여 선택 상태의 값을 배열에 추가한다.
        const opts = e.target.options;

        for(const opt of opts){
            if(opt.selected){
                data.push(opt.value);
            }
        }

        setForm({
            ...form,
            [e.target.name]:data
        });
    }

    const show = () => {
        console.log(`좋아하는 동물:${form.animal}`);
    };

    return(
        <>
            <hr></hr>
            <h4>▶ 입력 요소에 따른 폼 구현 예시(다중 선택 상자)</h4>
            <form>
                <label htmlFor="animal">좋아하는 동물:</label>
                <select id="animal" name="animal" value={form.animal} size="4" multiple={true} onChange={handleFormList}>
                    <option value="cat">고양이</option>
                    <option value="dog">개</option>
                    <option value="hamster">햄스터</option>
                    <option value="rabbit">토끼</option>                   
                </select>
                <button type="button" onClick={show}>보내기</button>
            </form>
        </>
    )
}
/////////////////////////////////
export const FormRadio = () => {
    const [form, setForm] = useState({
        os:'windows'
    });

    const handleForm = e => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    const show = () => {
        console.log(`사용OS:${form.os}`);
    }

    return(
        <>
            <hr></hr>
            <h4>▶ 입력 요소에 따른 폼 구현 예시(라디오 버튼)</h4>
            <form>
                <fieldset>
                    <legend>사용OS:</legend>
                    <label htmlFor="os_win">Windows</label>
                    <input id="os_win" name="os" type="radio" value="windows" checked={form.os === "windows"} onChange={handleForm}></input><br></br>
                    <label htmlFor="os_mac">macOS</label>
                    <input id="os_mac" name="os" type="radio" value="mac" checked={form.os === "mac"} onChange={handleForm}></input><br></br>
                    <label htmlFor="os_lin">Linux</label>
                    <input id="os_lin" name="os" type="radio" value="linux" checked={form.os === "linux"} onChange={handleForm}></input><br></br>
                </fieldset>
                <button type="button" onClick={show}>보내기</button>
            </form>
        </>
    )
}
/////////////////////////////////
export const FormCheck = () =>{
    const [form, setForm] = useState({
        agreement:true
    });

    const handleFormCheck = e =>{
        let temp = form.agreement;

        setForm({
            ...form,
            [e.target.name]:!temp
        })
    }

    const show = () => {
        console.log(`동의 확인: ${form.agreement ? '동의':'동의하지 않음'}`);
    }

    return(
        <>
            <hr></hr>
            <h4>▶ 입력 요소에 따른 폼 구현 예시(체크박스-단일선택)</h4>
            <form>
                <label htmlFor="agreement">동의합니다:</label>
                <input id="agreement" name="agreement" type="checkbox" checked={form.agreement} onChange={handleFormCheck}></input><br></br>
                <button type="button" onClick={show}>보내기</button>
            </form>
        </>
    )
}
/////////////////////////////////
export const FormCheckMulti = () => {
    const [form, setForm] = useState({
        animal:['dog','hamster']
    });

    const handleFormMulti = e => {
        const fa = form.animal;

        if(e.target.checked){
            fa.push(e.target.value);
        }
        else{
            fa.splice(fa.indexOf(e.target.value),1);
        }

        //편집된 배열을 State에 반영
        setForm({
            ...form,
            [e.target.name]:fa
        });        
    }

    const show = () => {
        console.log(`좋아하는 동물:${form.animal}`);
    };

    return(
        <>
            <hr></hr>
            <h4>▶ 입력 요소에 따른 폼 구현 예시(체크박스-복수선택)</h4>
            <form>
                <fieldset>
                    <legend>좋아하는 동물:</legend>
                    <label htmlFor="animal_dog">개</label>
                    <input id="animal_dog" name="animal" type="checkbox" value="dog" checked={form.animal.includes('dog')} onChange={handleFormMulti}></input><br></br>
                    <label htmlFor="animal_cat">고양이</label>
                    <input id="animal_cat" name="animal" type="checkbox" value="cat" checked={form.animal.includes('cat')} onChange={handleFormMulti}></input><br></br>
                    <label htmlFor="animal_hamster">햄스터</label>
                    <input id="animal_hamster" name="animal" type="checkbox" value="hamster" checked={form.animal.includes('hamster')} onChange={handleFormMulti}></input><br></br>
                    <label htmlFor="animal_rabbit">토끼</label>
                    <input id="animal_rabbit" name="animal" type="checkbox" value="rabbit" checked={form.animal.includes('rabbit')} onChange={handleFormMulti}></input><br></br>
                </fieldset>
                <button type="button" onClick={show}>보내기</button>
            </form>
        </>
    )
}
/////////////////////////////////
export const FormFile = () =>{
    const file = useRef(null);

    const show = () => {
        const fs = file.current.files;

        for(const f of fs){
            //획득한 파일군을 순서대로 스캔
            console.log(`파일명:${f.name}`);
            console.log(`종류:${f.type}`);
            console.log(`크기:${Math.trunc(f.size / 1024)}KB`);
        }        
    }

    return(
        <>
            <hr></hr>
            <h4>▶ 입력 요소에 따른 폼 구현 예시(파일 입력 박스)</h4>
            <form>
                <input type="file" ref={file} multiple></input>
                <button type="button" onClick={show}>보내기</button>
            </form>
        </>
    )
}
/////////////////////////////////
export const StateNest = () => {
    const [form, setForm] = useState({
        name:'홍길동',
        address:{
            do:'충청남도',
            city:'태안'
        }
    });

    //1단계 요소를 업데이트하는 핸들러
    const handleForm = e => {
        setForm({
            ...form,
            [e.target.name]:e.target.value
        })
    }

    //2단계 요소를 업데이트하는 핸들러
    const handleFormNest = e => {
        setForm({
            ...form,
            address:{
                ...form.address,
                [e.target.name]:e.target.value
            }
        });
    }

    const show = () => {
        console.log(`${form.name} (${form.address.do} ${form.address.city})`);
    }

    return(
        <>
            <hr></hr>
            <h4>▶ State의 구조화된 데이터 업데이트</h4>
            <form>
                <div>
                    <label htmlFor="name">이름:</label>
                    <input id="name" name="name" type="text" onChange={handleForm} value={form.name}></input>
                </div>
                <div>
                    <label htmlFor="do">주소(도):</label>
                    <input id="do" name="do" type="text" onChange={handleFormNest} value={form.address.do}></input>
                </div>
                <div>
                    <label htmlFor="city">주소(시/군/구):</label>
                    <input id="city" name="city" type="text" onChange={handleFormNest} value={form.address.city}></input>
                </div>
                <div>
                    <button type="button" onClick={show}>보내기</button>
                </div>
            </form>
        </>
    )
}
/////////////////////////////////
export const StateNestImmer = () => {
    const [form, setForm] = useImmer({
        name:'홍길동',
        address:{
            do:'충청남도',
            city:'태안'
        }
    });

    const handleForm = e => {
        setForm(form => {
            form[e.garget.name] = e.target.value;
        })
    };

    const handleFormNest = e => {
        setForm(form => {
            form.address[e.target.name] = e.target.value;
        })
    };

    const show = () => {
        console.log(`${form.name} (${form.address.do} ${form.address.city})`);
    }

    return(
        <>
            <hr></hr>
            <h4>▶ Immer 라이브러리를 통한 개선</h4>
            <form>
                <div>
                    <label htmlFor="name">이름:</label>
                    <input id="name" name="name" type="text" onChange={handleForm} value={form.name}></input>
                </div>
                <div>
                    <label htmlFor="do">주소(도):</label>
                    <input id="do" name="do" type="text" onChange={handleFormNest} value={form.address.do}></input>
                </div>
                <div>
                    <label htmlFor="city">주소(시/군/구):</label>
                    <input id="city" name="city" type="text" onChange={handleFormNest} value={form.address.city}></input>
                </div>
                <div>
                    <button type="button" onClick={show}>보내기</button>
                </div>
            </form>
        </>
    )
}
/////////////////////////////////
export const StateNestImmer2 = () => {
    const [form, setForm] = useImmer({
        name:'홍길동',
        address:{
            do:'충청남도',
            city:'태안'
        }
    });

    const handleNest = e =>{
        const ns = e.target.name.split('.');

        setForm(form =>{
            //계층에 따라 대위임처를 변경한다
            if(ns.length === 1){
                form[ns[0]] = e.target.value;
            }
            else{
                form[ns[0]][ns[1]] = e.target.value;
            }
        })
    };

    const show = () => {
        console.log(`${form.name} (${form.address.do} ${form.address.city})`);
    }

    return(
        <>
            <hr></hr>
            <h4>▶ Immer 라이브러리를 통한 개선(핸들러 공통화하기)</h4>
            <form>
                <div>
                    <label htmlFor="name">이름:</label>
                    <input id="name" name="name" type="text" onChange={handleNest} value={form.name}></input>
                </div>
                <div>
                    <label htmlFor="do">주소(도):</label>
                    <input id="do" name="address.do" type="text" onChange={handleNest} value={form.address.do}></input>
                </div>
                <div>
                    <label htmlFor="city">주소(시/군/구):</label>
                    <input id="city" name="address.city" type="text" onChange={handleNest} value={form.address.city}></input>
                </div>
                <div>
                    <button type="button" onClick={show}>보내기</button>
                </div>
            </form>
        </>
    )
}
/////////////////////////////////
// Todo 항목 id의 최대값(등록할 때마다 증가)
let maxId = 0;
export const StateTodo = () => {
    // 입력값(title), 할 일 목록(todo)을 State로 관리
    const [title, setTitle] = useState('');
    const [todo, setTodo] = useState([]);
    const [desc, setDesc] = useState(true);

    // 텍스트 상자에 입력한 내용을 State에 반영
    const handleChangeTitle = e => {
        setTitle(e.target.value);
    };

    const handleClick = () => {
        // 새 할 일 추가
        setTodo([
            ...todo,
            {
                id: ++maxId,
                title,
                created: new Date(),
                isDone:false
            }
        ]);
    };

    // [완료] 버튼으로 Todo 항목을 완료 상태로 변경
    const handleDone = e => {
        // todo 배열을 스캔하여 id 값이 같은 것을 검색
        setTodo(todo.map(item =>{
            if(item.id === Number(e.target.dataset.id)){
                return{
                    ...item,
                    isDone:true
                }
            }
            else{
                return item;
            }
        }));
    };    

    // [삭제] 버튼으로 해당 Todo 항목을 삭제
    const handleRemove = e => {
        setTodo(todo.filter(item => item.id !== Number(e.target.dataset.id)))
    }

    const handleSort = e => {
        // 기존 Todo 목록을 복제하여 정렬하기
        const sorted = [...todo];
        sorted.sort((m,n) => {
            // desc 값에 따라 오름차순/내림차순 결정
            if(desc){
                return n.created.getTime() - m.created.getTime();
            }
            else{
                return m.created.getTime() - n.created.getTime();
            }
        });

        setDesc(d => !d);
        setTodo(sorted);
    }
    
    
    return(
        <div>
            <hr></hr>
            <h4>▶ 배열 업데이트</h4>
            <label>
                해야 할 일:
                <input type="text" name="title" value={title} onChange={handleChangeTitle}></input>
            </label>
            <button type="button" onClick={handleClick}>추가하기</button>
            {/* desc 값에 따라 캡션 변경 */}
            <button type="button" onClick={handleSort}>정렬({desc ? '↑':'↓'})</button>
            <hr></hr>
            {/* 할 일을 목록으로 정리하기 */}
            <ul>
                {todo.map(item => (
                    <li key={item.id} className={item.isDone ? 'done':''}>{item.title}
                        <button type="button" onClick={handleDone} data-id={item.id}>완료</button>
                        <button type="button" onClick={handleRemove} data-id={item.id}>삭제</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}
/////////////////////////////////
export const FormBasic = () => {
    const defaultVlaues = {
        name:'홍길동',
        email:'admin@example.com',
        gender:'male',
        memo:''
    }

    // 폼 초기화
    const {register, handleSubmit, formState:{errors, isDirty, isvalid, isSubmitting}} = useForm({
        defaultVlaues
    });

    // 제출 시 처리
    // 제출시 4000밀리초로 처리(더미 지연처리)
    const onsubmit = data => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
                console.log(data);
            alert("성공");
            }, 4000);
        })        
    }
    const onerror = err => {
        console.log(err);
        alert("실패");
    }
   
    return(
        <>
            <hr></hr>
            <h4>▶ 검증기능 구현 - React Hook Form</h4>
            <form onSubmit={handleSubmit(onsubmit, onerror)} noValidate>
                {/* 검증 규칙 등을 폼에 연결 */}
                <div>
                    <label htmlFor="name">이름:</label>
                    <input id="name" type="text"
                        {...register('name', {
                                required:'이름은 필수 입력 항목입니다.',
                                maxLength:{
                                    value:20,
                                    message:'이름은 20자 이내로 작성해 주세요.'
                                }
                            })} />
                    <div>{errors.name?.message}</div>
                </div>
                <div>
                    <label htmlFor="gender">성별:</label><br></br>
                    <label>
                        <input type="radio" value="male"
                            {...register('gender', {
                                    required:'성별은 필수입니다.',
                                })} />남성
                    </label>
                    <label>
                        <input type="radio" value="female"
                            {...register('gender', {
                                    required:'성별은 필수입니다.',
                                })} />여성
                    </label>
                    <div>{errors.gender?.message}</div>
                </div>
                <div>
                    <label htmlFor="email">이메일 주소:</label><br></br>
                    <input id="email" type="email"
                        {...register('email', {
                                required:'이메일 주소는 필수 입력사항입니다.',
                                pattern:{
                                    value:/([a-z\d+-.]+)@([a-z\d-]+(?:\.[a-z]+)*)/i,
                                    message:'이메일 주소 형식이 잘못되었습니다.'
                                }
                            })} />
                    <div>{errors.email?.message}</div>
                </div>
                <div>
                    <label htmlFor="memo">메모:</label><br></br>
                    <textarea id="memo"
                        {...register('memo',{
                                required:'비고는 필수 입력 항목입니다',
                                minLength:{
                                    value:10,
                                    message:'메모는 10자 이상으로 작성해 주세요.'
                                },
                                validate:{
                                    ng:(value, formValues) => { //인수는 대상 필드의 입력값(value), 폼 전체의 입력값(formValues) : formValues.fieldName
                                        // 부적절한 단어 준비
                                        const ngs = ['폭력','죽음','크로테스크'];

                                        // 입력 문자열에 부적절한 단어가 포함되어 있는지 판단
                                        for(const ng of ngs){
                                            if(value.includes(ng)){
                                                return '메모에 적절하지 않은 단어가 포함되어 있습니다';
                                            }
                                        }

                                        return true;
                                    }
                                }
                            })} />
                    <div>{errors.memo?.message}</div>
                </div>
                <div>
                    <button type="submit" disabled={isSubmitting}>제출하기</button>
                    {isSubmitting && <div>...제출중...</div>}
                </div>
            </form>
        </>        
    )
}
/////////////////////////////////
yup.addMethod(yup.string,'ng',function(){
    return this.test('ng',
        ({label}) => `${label}에 적절하지 않은 단어가 포함되어 있습니다.`,
            value => {
                // 부적절한 단어 준비
                const ngs = ['폭력','죽음','그로테스크'];

                // 입력 문자열에 부적절한 단어가 포함되었는지 판단
                for(const ng of ngs){
                    if(value.includes(ng)){
                        return false;
                    }
                }

                return true;
            }    
    )
})

const schema = yup.object({
    name:yup
        .string()
        .label('이름')
        .required('${label}은 필수 입력입니다.')
        .max(20, '${label}은 ${max}자 이내로 입력하세요')
        .trim().lowercase()
        .ng(),
    gender:yup
        .string()
        .label('성별')    
        .required('${label}은 필수 입력입니다.'),
    email:yup
        .string()
        .label('이메일 주소')
        .required('${label}은 필수 입력입니다.')
        .email('${label}의 형식이 잘못되었습니다.'),
    memo:yup
        .string()
        .label('비고')
        .required('${label}은 필수 입력입니다.')
        .min(10,'${label}은 ${min}자 이상으로 입력하세요.')      
        .ng()
});

export const FormYup = () => {
    const {register, handleSubmit, formState:{errors, isSubmitting}} = useForm({
        defaultVlaues:{
            name:'홍길동',
            email:'admin@example.com',
            gender:'male',
            memo:''
        },
        //Yup에게 검증을 맡기다
        resolver:yupResolver(schema)
    });

    // 제출 시 처리
    // 제출시 4000밀리초로 처리(더미 지연처리)
    const onsubmit = data => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve();
                console.log(data);
            alert("성공");
            }, 4000);
        })        
    }
    const onerror = err => {
        console.log(err);
        alert("실패");
    }

    return (
        <>
            <hr></hr>
            <h4>▶ 검증기능 구현 - React Hook Form(검증 라이브러리와 연동하기)</h4>
            <form onSubmit={handleSubmit(onsubmit,onerror)} noValidate>
                <div>
                    <label htmlFor="name">이름:</label><br></br>
                    <input id="name" type="text" {...register('name')} />
                    <div>{errors.name?.message}</div>
                </div>
                <div>
                    <label htmlFor="gender">성별:</label><br></br>
                    <label>
                        <input type="radio" value="male" {...register('gender')} />남성
                    </label>
                    <label>
                        <input type="radio" value="female" {...register('gender')} />여성
                    </label>
                    <div>{errors.gender?.message}</div>
                </div>
                <div>
                    <label htmlFor="email">이메일 주소:</label><br></br>
                    <input id="email" type="email" {...register('email')} />
                    <div>{errors.email?.message}</div>
                </div>
                <div>
                    <label htmlFor="memo">비고:</label><br></br>
                    <textarea id="memo" {...register('memo')} />
                    <div>{errors.memo?.message}</div>
                </div>
                <div>
                    <button type="submit" disabled={isSubmitting}>제출하기</button>
                    {isSubmitting && <div>...제출중...</div>}
                </div>
            </form>
        </>
    )
}