import * as anchor from "@project-serum/anchor";
import * as sweb3 from "@solana/web3.js";
import bs58 from 'bs58';

export const RPC_HOST = "https://explorer-api.mainnet-beta.solana.com";
export const CONNECTION = new anchor.web3.Connection(RPC_HOST);
export const METADATA_PROGRAM_ID = "metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s";

export const getMetadataAccountByUpdateAuthority = async (
    connection: anchor.web3.Connection,
    updateAuthority: string
) => {
    return await connection.getProgramAccounts(
        new anchor.web3.PublicKey(METADATA_PROGRAM_ID),
        {
            encoding: "base64",
            // https://github.com/metaplex-foundation/metaplex/blob/cdef1a445bc8068566b6008ac20a46ce89cccae6/js/packages/common/src/contexts/meta/loadAccounts.ts#L951
            filters: [
                {
                    memcmp: {
                        /** offset into program account data to start comparison */
                        offset: 1,
                        /** data to match, as base-58 encoded string and limited to less than 129 bytes */
                        bytes: updateAuthority,
                    },
                },
            ],
        }
    );
};

// https://github.com/metaplex-foundation/metaplex/blob/de29e6e1a3981dbe98affc75f455943b4488f939/js/packages/common/src/actions/metadata.ts#L457
const decodeMetadatur = (buffer: any) => {
    // decode account data
    return buffer;
}

// execute top-level code with async function calls
(async () => {
    const updateAuthority = "";
    const metadataAccounts = await getMetadataAccountByUpdateAuthority(CONNECTION, updateAuthority);

    metadataAccounts.forEach((metadata: any) => {
        const decodedMetadatur = decodeMetadatur(metadata.account.data);
        console.log('human readable metadata: ', decodedMetadatur);
    });
})();