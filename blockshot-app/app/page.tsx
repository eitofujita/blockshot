'use client';

import { useCallback } from 'react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { WalletConnectionProvider } from '../components/WalletConnectionProvider';
import { useAnchorProgram } from '../lib/anchor';
import { useWallet } from '@solana/wallet-adapter-react';
import { web3, BN } from '@project-serum/anchor';

export default function Home() {
    const { getProgram } = useAnchorProgram();
    const wallet = useWallet();

    const handleInitialize = useCallback(async () => {
        try {
            const program = getProgram;
            const [dataAccount] = web3.PublicKey.findProgramAddressSync(
                [wallet.publicKey!.toBuffer()],
                program.programId
            );

            const tx = await program.methods
                .initialize(new BN(123))
                .accounts({
                    dataAccount,
                    user: wallet.publicKey!,
                    systemProgram: web3.SystemProgram.programId,
                })
                .rpc();

            console.log('✅ Transaction sent:', tx);
        } catch (err) {
            console.error('❌ Transaction failed:', err);
        }
    }, [getProgram, wallet]);

    return (
        <WalletConnectionProvider>
            <main style={{ padding: 40 }}>
                <h1> Blockshot Wallet</h1>
                <WalletMultiButton />
                {wallet.connected && (
                    <button onClick={handleInitialize} style={{ marginTop: 20 }}>
                        Initialize On-Chain
                    </button>
                )}
            </main>
        </WalletConnectionProvider>
    );
}
