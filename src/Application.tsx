import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LayoutComponent from './components/Layout';
import DataPage from './pages/Data';
import HomePage from './pages/Home';
import { INftItem } from './components/Lookup';

export interface IApplicationProps {}

const Application: React.FunctionComponent<IApplicationProps> = (props) => {
    const [nftItems, setNftItems] = useState<INftItem[]>([]);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage nftItems={nftItems} setNftItems={setNftItems} />} />
                <Route path="data">
                    <Route index element={<DataPage nftItems={nftItems} setNftItems={setNftItems} />} />
                    <Route path=":number" element={<DataPage nftItems={nftItems} setNftItems={setNftItems} />} />
                </Route>
                <Route path="layout" element={<LayoutComponent />}>
                    <Route index element={<DataPage nftItems={nftItems} setNftItems={setNftItems} />} />
                    <Route path=":number" element={<DataPage nftItems={nftItems} setNftItems={setNftItems} />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Application;
