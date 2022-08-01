import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { INftItem } from '../components/Lookup';

import axios from 'axios';

export interface INftDetails {
    imageUrl: string;
    image: string;
    assetId: string;
    isTransferable: boolean;
    attributes: [
        {
            type: string;
            val: string;
        }
    ];
}
interface Props {
    setNftDetails: React.Dispatch<React.SetStateAction<INftDetails>>;
    nftDetails: INftDetails;
    nftItems: INftItem[];
}

const NftItem: React.FC<Props> = ({ setNftDetails, nftItems }) => {
    const navigate = useNavigate();

    const nftSelected = nftItems.filter((nft) => nft.selected)[0];

    const baseUrl = 'https://gamma.io/api/v1/collections/';
    const contractAddress = nftSelected.item.split('.')[0];
    const contractName = nftSelected.item.split('.')[1].split('::')[0];
    const id = nftSelected.id;

    const [item, setItem] = useState('');

    useEffect(() => {
        const getDetails = async () => {
            const detailsUrl = `${baseUrl}${contractAddress}.${contractName}/${id}`;
            const contractUrl = `https://stacks-node-api.mainnet.stacks.co/v2/contracts/interface/${contractAddress}/${contractName}`;
            const resDetails = await axios.get(detailsUrl);
            const resContract = await axios.get(contractUrl);

            let isTransferable = false;
            if (resContract && resContract.data.functions.filter((func: any) => func.name === 'transfer').length > 0) {
                const transferFunc = resContract.data.functions.filter((func: any) => func.name === 'transfer')[0];

                isTransferable = transferFunc.args.length === 3;
            }
            const nftMetadata = resDetails.data.data.token_metadata;
            const nftAttributes = resDetails.data.data.nft_token_attributes;
            const attribs = nftAttributes.map((each: any) => {
                return {
                    type: each.trait_type,
                    val: each.value
                };
            });

            if (!nftMetadata) {
                alert('No metadata received for item');
            } else {
                setNftDetails({
                    imageUrl: nftMetadata.image_url,
                    image: `https://ipfs.io/ipfs/${nftMetadata.image_url.split('//')[1]}`,
                    assetId: resDetails.data.data.asset_id,
                    isTransferable,
                    attributes: attribs
                });
            }
        };
        getDetails();
    }, [item]);

    return (
        <div>
            <div>
                <button onClick={() => navigate('/')}>
                    {' '}
                    <text>Home</text>
                </button>
            </div>
        </div>
    );
};

export default NftItem;
