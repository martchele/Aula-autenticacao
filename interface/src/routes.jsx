import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Pessoa from './pages/Pessoa/Pessoa';

function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path='/pessoas' element={<Pessoa />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;