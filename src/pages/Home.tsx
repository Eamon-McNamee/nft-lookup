import React from 'react';
import { Link } from 'react-router-dom';
import LookUp, { INftItem } from '../components/Lookup';

export interface IHomePageProps {
    setNftItems: React.Dispatch<React.SetStateAction<INftItem[]>>;
    nftItems: INftItem[];
}

const HomePage: React.FunctionComponent<IHomePageProps> = ({ nftItems, setNftItems }) => {
    const setSelected = (index: number) => {
        const updatedList = [...nftItems];
        updatedList[index].selected = true;
        setNftItems(updatedList);
    };

    const listItems = nftItems.map((nft, indx) => (
        <li key={`${nft.id}${indx}`}>
            <Link to="/data" onClick={() => setSelected(indx)}>
                {indx + 1}
                <div />
                {nft.item}
            </Link>
        </li>
    ));

    return (
        <div>
            <LookUp setNftItems={setNftItems} nftItems={nftItems} />
            {listItems}
        </div>
    );
};

export default HomePage;
