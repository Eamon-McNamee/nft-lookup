import React, { useState } from 'react';
import axios from 'axios';

export interface INftItem {
    item: string;
    id: string;
    selected: boolean;
}
interface Props {
    setNftItems: React.Dispatch<React.SetStateAction<INftItem[]>>;
    nftItems: INftItem[];
}
const LookUp: React.FC<Props> = ({ nftItems, setNftItems }) => {
    const [stacksAddress, setStacksAddress] = useState('SP36DHK0QACYS0FNVZ0Q5HMA10CD29XZNE029QX1F');

    const baseUrl = 'https://stacks-node-api.mainnet.stacks.co/extended/v1/address/';
    const postFix = '/nft_events';

    const lookUp = async () => {
        const url = `${baseUrl}${stacksAddress}${postFix}`;
        const response = await axios.get(url);
        const allNft = response.data.nft_events;
        const newNftList = allNft.map((eachNft: any) => {
            return {
                item: eachNft.asset_identifier || '1',
                id: eachNft.value.repr.replace(/\D/g, '') || '1',
                selected: false
            };
        });

        if (!newNftList) {
            alert('No NFT items for address');
        } else {
            setNftItems(newNftList);
        }
    };
    return (
        <div>
            <text>Lookup Address</text>
            <div>
                <form>
                    <input placeholder="Enter item" value={stacksAddress} onChange={(e) => setStacksAddress(e.target.value)} />
                </form>
                {/* {listItems} */}
                <button onClick={lookUp}>
                    <text>Look Up</text>
                </button>
            </div>
        </div>
    );
};

export default LookUp;
