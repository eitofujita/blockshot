import { AnchorProvider, Program, Idl, web3 } from '@project-serum/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import idl from '../idl/blockshot_program.json';
import { useMemo } from 'react';

const programId = new web3.PublicKey('G5VqRsSrsxv2GMMYiMpby6bpqfLFSkWEJWNqt6ZMwCgZ')
export const useAnchorProgram = () => {
    const wallet = useWallet();

    const getProgram = useMemo(() => {
        const connection = new web3.Connection('https://api.testnet.solana.com');
        const provider = new AnchorProvider(connection, wallet as any, {
            preflightCommitment: 'processed',
        });
        return new Program(idl as Idl, programId, provider);
    }, [wallet]);

    return { getProgram };
};