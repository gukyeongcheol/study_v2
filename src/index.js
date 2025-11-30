// 리액트 관련 라이브러리 가져오기
import React,{Suspense} from 'react';
import ReactDOM from 'react-dom/client';
import{ QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';

// 앱별 코드 가져오기
import './index.css';
import App from './App.js';

// 성능 모니터링을 위한 서비스 가져오기
import reportWebVitals from './reportWebVitals';

// 리액트 앱 렌더링
const root = ReactDOM.createRoot(document.getElementById('root'));
/***
 const cli = new QueryClient({
  defaultOptions:{
    queries:{
      suspense:true
    }
  }
});
 
 */
const cli = new QueryClient();

/*
root.render(
  <React.StrictMode>
    <Suspense fallback={<p>Loading...</p>}>
      <ErrorBoundary fallback={<div>오류가 발생했습니다</div>}>
        <QueryClientProvider client={cli}>
          <App></App>
        </QueryClientProvider>  
      </ErrorBoundary>
    </Suspense>      
  </React.StrictMode>
);
*/
root.render(
  <React.StrictMode>   
      <QueryClientProvider client={cli}>
        <App></App>
      </QueryClientProvider>        
  </React.StrictMode>
);

// 앱에서 성능 측정을 시작하려면 함수를 전달하세요
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// 성능 모니터링 도구 활성화
reportWebVitals();
