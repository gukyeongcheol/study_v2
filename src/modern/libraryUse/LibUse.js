import { useState } from 'react';
import{ useQuery} from '@tanstack/react-query';
import {Home, Mail, Info, AccountTree} from '@mui/icons-material';
import {Button, Box, Drawer, List, ListItem, ListItemButton, ListItemText, ListItemIcon,
    FormControl,FormControlLabel, FormHelperText, FormLabel, Radio,RadioGroup,TextField
} from '@mui/material';
import { useForm } from 'react-hook-form';
import Grid from '@mui/material/Grid';

/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

export const MaterialBasic = () =>{
    //텍스트 대/소문자 변환을 비활성화
    const font = css`
    text-transform:none;
    `;

    return(
        <>
            <h4>▶ MUI의 기본</h4>
            <Button variant='text' color='secondary'>Text</Button>
            <Button variant='contained' color='success'>Contained</Button>
            <Button variant='outlined' color='error'>Outlined</Button>            
            <Button variant='contained' color='warning' disableElevation={true}>Outlined</Button>
            <Button variant='outlined' color='primary' disabled='true'>Outlined</Button>
            <Button variant='outlined' color='primary' size='large' css={font}>Outlined</Button>          
            <br></br>
            <Button variant='outlined' color='info' fullWidth={true}>Outlined</Button>
        </>
    )
}
/////////////////////////////////
//표시용 메뉴 정보 준비
const menu = [
    {title:'홈', href:'home.html', icon:Home},
    {title:'Contact Us', href:'contact.html', icon:Mail},
    {title:'회사 소개', href:'company.html', icon:Info},
    {title:'사이트맵', href:'sitemap.html', icon:AccountTree}
]

export const MaterialDrawer = () => {
    //드로워 개폐를 위한 플래그
    const [show, setShow] = useState(false);

    //버튼 클릭시 호출되는 핸들러(show를 반전)
    const handleDraw = () => setShow(!show);

    return(
        <>
            <hr></hr>
            <h4>▶ 드로워 메뉴 구현하기</h4>
            <Button onClick={handleDraw}>드로워</Button>
            {/** hideBackdrop(true이면 드로워를 포시할 때 메인 화면 회색 표시) */}
            <Drawer anchor='left' open={show}>
                <Box sx={{height:'100vh'}} onClick={handleDraw}>
                    <List disablePadding={false}>
                        {/* 미리 준비된 배열을 메뉴로 확장 */}
                        {menu.map(obj => {
                            const Icon = obj.icon;

                            return(
                                <ListItem key={obj.title} divider={true} disablePadding={false} disableGutters={false}>
                                    <ListItemButton href={obj.href} autoFocus={false} disabled={false} selected={false}>
                                        <ListItemIcon><Icon></Icon></ListItemIcon>
                                        <ListItemText primary={obj.title} inset={false}></ListItemText>
                                    </ListItemButton>
                                </ListItem>
                            )
                        })}
                    </List>
                </Box>
            </Drawer>
        </>
    )
}
/////////////////////////////////
export const MaterialGrid = () => {
    return(
        <>
            <hr></hr>
            <h4>▶ 페이지 내 배치를 조정하는 레이아수 기능 활용하기-그리드</h4>
            {/* direction(컬럼 배치방법:column,row,column-reverse,row-revers) : default는 row  예시: direction={'column'} */}
            {/* wrap(컬럼이 넘첬을때 나열하는 방법: nowrap, wrap, wrap-reverse) : default는 wrap 예시:  wrap='nowrap' */}
            <Grid container spacing={2} columnSpacing={0} rowSpacing={0}>
                <Grid size={6}>
                    <Button variant='contained' fullWidth>1</Button>
                </Grid>
                <Grid size={2}>
                    <Button variant='contained' fullWidth>2</Button>
                </Grid>
                <Grid size={3}>
                    <Button variant='contained' fullWidth>3</Button>
                </Grid>
                <Grid size={12}>
                    <Button variant='contained' fullWidth>4</Button>
                </Grid>
            </Grid>
        </>
    )
}
/////////////////////////////////
export const FormMui = () => {
    const defaultValues = {
        name:'홍길동',
        email:'admin@example.com',
        gender:'male',
        memo:''
    };

    const {register, handleSubmit, formState:{errors}} = useForm({
        defaultValues
    });

    const onsubmit = data => console.log(data);
    const onerror = err => console.log(err);

    return(
        <>
            <hr></hr>
            <h4>▶ React Hook Form + MUI 연동하기</h4>
            <form onSubmit={handleSubmit(onsubmit,onerror)} noValidate>
                <div>
                    <TextField label="이름" margin='normal'
                        {...register('name',{
                            required:'이름은 필수 입력 항목입니다',
                            maxLength:{
                                value:20,
                                message:'이름은 20자 이내로 작성해 주세요'
                            }
                        })}
                        error={'name' in errors}
                        helperText={errors.name?.message}
                    ></TextField>
                </div>
                <div>
                    <FormControl>
                        <FormLabel component='legend'>성별:</FormLabel>
                        <RadioGroup name='gender'>
                            <FormControlLabel value='male' control={<Radio></Radio>} label='남성'
                                {...register('gender',{
                                    required:'성별은 필수입니다.'
                                })}
                            ></FormControlLabel>
                            <FormControlLabel value='famale' control={<Radio></Radio>} label='여성'
                                {...register('gender',{
                                    required:'성별은 필수입니다.'
                                })}
                            ></FormControlLabel>
                        </RadioGroup>
                        <FormHelperText error={'gender' in errors}>
                            {errors.gender?.message}
                        </FormHelperText>
                    </FormControl>
                </div>
                <div>
                    <TextField type='email' label='이메일 주소' margin='normal'
                        {...register('email',{
                            required:'이메일 주소는 필수 입력 항목입니다.',
                            pattern:{
                                value:/([a-z\d+\-.]+)@([a-z\d-]+(?:\.[a-z]+)*)/i,
                                message:'이메일 주소 형식이 잘못됐습니다.'
                            }
                        })}
                        error={'email' in errors}
                        helperText={errors.email?.message}
                    ></TextField>
                </div>
                <div>
                    <TextField label="비고" margin='normal' multiline
                        {...register('memo',{
                            required:'비고는 필수 입력 항목입니다',
                            minLength:{
                                value:10,
                                message:'비고는 10자 이상으로 작성해 주세요'
                            }
                        })}
                        error={'memo' in errors}
                        helperText={errors.memo?.message}
                    ></TextField>
                </div>
                <div>
                    <Button variant='contained' type='submit'>제출하기</Button>
                </div>
            </form>
        </>
    )
}
/////////////////////////////////
// delay 초 동안 처리를 일시 정지하는 sleep 함수
const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));

//날씨 정보를 얻기 위한 함수
const fetchWeather = async () => {
    //처리 지연을 위한 더미 휴지 처리
    await sleep(2000);

    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=Seoul&appid=4aa938c18eef68955f584ededec88d63`);

    if(res.ok){return res.json();}

    throw new Error(res.statusText);
};

export const QueryBasic = () => {
    //fetchWeather 함수로 데이터 가져오기
    /** opts~
     * casheTime : 캐시시간(기본값은 5 * 60 * 1000 밀리초)
     * initialData : 쿼리캐시 초기 데이터
     * select : 쿼리 반환값을 변환하는 함수
     * refetchInterval : 재취득 간격(밀리초)
     * refetchOnMount : 마운트 시 재취득 여부(true이고 데이터가 오래된 경우 재취득)
     * refetchOnWindowFocus : 윈도우로 포커스 이동시 재취득 여부(true이고 데이터가 오래된 경우 재취득)
     * retry : 실패시 재시도 횟수(기본값은 3)
     * retryDelay : 재시도 시 지연 시간(기본값은 기하급수적으로 지연)
     * onSettled : 쿼리가 종료될 때 호출되는 처리
     * onSuccess : 쿼리가 성공했을 때 호출되는 처리
     * onError : 쿼리가 실패했을 때 호출되는 처리
     * 
     * 반환값~
     * data : 획득한 데이터
     * dataUpdatedAt : 쿼리가 마지막으로 성공했을 때의 타임스템프
     * error : 오류 정보
     * errorUpdatedAt : 쿼리가 마지막으로 실패했을 때의 타임스템프
     * failureCount : 쿼리 실패 횟수
     * status : 쿼리상태(idle, loading, success, error 등)
     * isSuccess : 취득에 성공했는지
     * isError : 데이터 수집에 실패했는지
     * isIdle : 유휴 상태인지
     * isLoading : 로드 상태인지
     * isLoadingError : 초기 취득시 오류가 발생했는지
     * isRefetchError : 재취득에서 오류가 발생했는지
     * refetch : 쿼리 재실행 함수
     * remove : 캐시를 삭제하는 함수
     */
    const {data, isLoading, isError, error} = useQuery({
        queryKey:['weather'],
        queryFn: fetchWeather,        
    });

    /* index.js에 공통을 설정하면 아래는 필요 없다 */
    if(isLoading){
        return <p>Loading...</p>
    }

    //통신 오류 발생시 오류 메시지 표시
    if(isError){
        return <p>Error:{error.message}</p>
    }
    

    //로딩 중이거나 오류가 아닌 경우 결과 표시
    return(
        <>            
            <hr></hr>
            <h4>▶ React Query를 이용한 예제</h4>
            <figure>
                <img
                    src={`https://openweathermap.org/img/wn/${data?.weather?.[0]?.icon}.png`}
                    alt={data?.weather?.[0]?.main}
                ></img>
                <figcaption>{data?.weather?.[0]?.description}</figcaption>
            </figure>               
        </>
    )
}
