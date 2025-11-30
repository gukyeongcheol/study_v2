import { Route, createRoutesFromElements, createBrowserRouter} from 'react-router-dom';
import RouterNav from './RouterNav.js';
import TodoBox from '../todo/TodoBox.js';
import ModernBox from '../modern/ModernBox.js';
import MainBox from '../MainBox.js';


const RouterLink = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<RouterNav></RouterNav>}>
            <Route index element={<MainBox></MainBox>}></Route>
            <Route path="todo" element={<TodoBox></TodoBox>}></Route>
            <Route path="modern" element={<ModernBox></ModernBox>}></Route>
        </Route>
    )
);

export default RouterLink;