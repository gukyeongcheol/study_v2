import { useState } from "react";
import ModernMenu from "./menu/MenuBox";
import {books} from '../data/book.js';
import MyHello, { ForList, ForNest, ForFilter, ForSort ,SelectStyle, EventMouse, EventCompare, EventError, EventPoint, EventKey, EventArgs, EventArgs2, EventPropagation, EventPropagation2} from "./compDev/CompDevBasic.js";
import {StateForm, StateFormUC, FormTextarea, FormSelect, FormMultiSelect, FormRadio, FormCheck, FormCheckMulti, FormFile, StateNest, StateNestImmer, StateNestImmer2, StateTodo, FormBasic, FormYup} from "./compDev/CompDevForm.js";
import { SuspenseSimple, ProfilerBasic, StyledComp, MyStyledButtonWrap, StyledCommon, StyledProps, PortalBasic, ErrorRoot, ErrorRetryRoot, ErrorRetryRootComp, ErrorEventRoot} from "./compDev/CompDevAppl.js";
import { MaterialBasic, MaterialDrawer, MaterialGrid, FormMui, QueryBasic } from "./libraryUse/LibUse.js";
import {HookTimer, HookEffect, HookRefForward, HookCallbackRef, HookCallbackRef2, HookReducer, HookContextChildGrand, RecoilCounter, RecoilTodo, RecoilTodoUp, HookMemo} from "./hookUse/hkUse.js";


export default function Modern(){
    const [menu, setMenu] = useState('compDevBasic');
    const [compDevBasic, setCompDevBasic] = useState(
        <>
            <ForList src={books}></ForList>
            <ForNest src={books}></ForNest>
            <ForFilter src={books}></ForFilter>
            <ForSort src={books}></ForSort>
            <SelectStyle mode='dark'></SelectStyle>
            <MyHello myName="구경철"></MyHello>
            <EventMouse
                alt="로고 이미지"
                beforeSrc="https://www.web-deli.com/image/linkbanner_l.gif"
                afterSrc="https://www.web-deli.com/image/home_chara.gif"
            ></EventMouse>
            <EventCompare></EventCompare>
            <EventError src="/img/_wings.jpg" alt="샘플 이미지"></EventError>
            <EventPoint></EventPoint>
            <EventKey></EventKey>
            <EventArgs></EventArgs>
            <EventArgs2></EventArgs2>
            <EventPropagation></EventPropagation>
            <EventPropagation2></EventPropagation2>
        </>
    );

    const [compDevForm, setCompDevForm] = useState(
        <>
            <StateForm></StateForm>
            <StateFormUC></StateFormUC>
            <FormTextarea></FormTextarea>
            <FormSelect></FormSelect>
            <FormMultiSelect></FormMultiSelect>
            <FormRadio></FormRadio>
            <FormCheck></FormCheck>
            <FormCheckMulti></FormCheckMulti>
            <FormFile></FormFile>
            <StateNest></StateNest>
            <StateNestImmer></StateNestImmer>
            <StateNestImmer2></StateNestImmer2>
            <StateTodo></StateTodo>
            <FormBasic></FormBasic>
            <FormYup></FormYup>
        </>
    );

    const [compDevAppl, setComDevAppl] = useState(
        <>
            <SuspenseSimple></SuspenseSimple>
            <ProfilerBasic></ProfilerBasic>
            <StyledComp></StyledComp>
            <MyStyledButtonWrap></MyStyledButtonWrap>
            <StyledCommon></StyledCommon>
            <StyledProps></StyledProps>
            <PortalBasic></PortalBasic>
            <ErrorRoot></ErrorRoot>
            <ErrorRetryRoot></ErrorRetryRoot>
            <ErrorRetryRootComp></ErrorRetryRootComp>
            <ErrorEventRoot></ErrorEventRoot>
        </>
    )

    const [libUse, setLibUse] = useState(
        <>
            <MaterialBasic></MaterialBasic>
            <MaterialDrawer></MaterialDrawer>
            <MaterialGrid></MaterialGrid>
            <FormMui></FormMui>
            <QueryBasic></QueryBasic>
        </>
    )

    const [hkUse, setHkUse] = useState(
        <>
            <HookTimer init={10}></HookTimer>
            <HookEffect init={10}></HookEffect>  
            <HookRefForward></HookRefForward>   
            <HookCallbackRef></HookCallbackRef>    
            <HookCallbackRef2></HookCallbackRef2>
            <HookReducer init={0}></HookReducer>
            <HookContextChildGrand></HookContextChildGrand>
            <RecoilCounter></RecoilCounter>
            <RecoilTodo></RecoilTodo>
            <RecoilTodoUp></RecoilTodoUp>
            <HookMemo></HookMemo>
        </>
    );

    const [target, setTarget] = useState(compDevBasic);

    const handleMenuChange = (pick) =>{
        setMenu(pick);
        
        switch(pick){
            case 'compDevBasic':
            default:
                setTarget(compDevBasic);
            break; 
            case 'compDevForm':
                setTarget(compDevForm);
            break;
            case 'compDevAppl':
                setTarget(compDevAppl);
            break;
            case 'libUse':
                setTarget(libUse);
            break;
            case 'hkUse':
                setTarget(hkUse);
            break;
        }                  
    }

    return (
        <>            
            <ModernMenu menuChgFunc={handleMenuChange}></ModernMenu>
            <br></br>
            <div id="dialog"></div>
            {target}                       
        </>        
    )
}