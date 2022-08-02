import React from 'react'
import { Routes, Route, useLocation } from 'react-router-dom';
import Homepage from './Homepage';
import Errorpage from './Errorpage';
import Moviepage from './Moviepage/Moviepage';

import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Homepage/>}/>
                <Route path="/movies/:id" element={<Moviepage/>}/>
                <Route path="*" element={<Errorpage/>}/>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes