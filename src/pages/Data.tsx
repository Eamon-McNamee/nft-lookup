import React, { useState } from 'react';
import NftItem, { INftDetails } from '../components/Details';
import { INftItem } from '../components/Lookup';

export interface IDataPageProps {
    setNftItems: React.Dispatch<React.SetStateAction<INftItem[]>>;
    nftItems: INftItem[];
}

const DataPage: React.FunctionComponent<IDataPageProps> = ({ nftItems }) => {
    const [nftDetails, setNftDetails] = useState<INftDetails>({
        imageUrl: '',
        image: '',
        assetId: '',
        isTransferable: false,
        attributes: [
            {
                type: '',
                val: ''
            }
        ]
    });

    const attribsList = nftDetails.attributes.map((project, index) => {
        return (
            <div key={index}>
                <li>
                    <text>{project.type}</text>
                    <text>{project.val}</text>
                </li>
            </div>
        );
    });

    return (
        <div>
            <p>NFT Details Page</p>
            <NftItem nftDetails={nftDetails} setNftDetails={setNftDetails} nftItems={nftItems} />
            {nftDetails.image && <img src={nftDetails.image} alt="nft" width="350" height="350" />}
            <div></div>
            <ul>
                Asset ID: {nftDetails.assetId && nftDetails.assetId}
                <div />
                Attributes:
                {attribsList}
                <div />
                <div />
                Transferable: {nftDetails.isTransferable.toString()}
            </ul>
        </div>
    );
};

export default DataPage;
