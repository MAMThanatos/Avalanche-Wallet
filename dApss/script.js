const connectBtn = document.getElementById('connectBtn');
const statusText = document.getElementById('statusText');
const addressText = document.getElementById('addressText');
const networkText = document.getElementById('networkText');
const balanceText = document.getElementById('balanceText');

const AVALANCHE_MAINNET = '0xa86a';
const AVALANCHE_FUJI    = '0xa869';

connectBtn.addEventListener('click', async (e) => {
    e.preventDefault();

    if (typeof window.ethereum !== 'undefined') {
        try {
            statusText.innerText = "Connecting...";

            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            const account = accounts[0];

            const chainId = await window.ethereum.request({ method: 'eth_chainId' });

            const balanceHex = await window.ethereum.request({
                method: 'eth_getBalance',
                params: [account, 'latest'],
            });

            statusText.innerText = "Connected";
            statusText.style.color = "#4ade80";
            addressText.innerText = account;

            if (chainId === AVALANCHE_MAINNET) {
                networkText.innerText = "Avalanche C-Chain";
            } else if (chainId === AVALANCHE_FUJI) {
                networkText.innerText = "Avalanche Fuji Testnet";
            } else {
                networkText.innerText = "Unknown Network (" + chainId + ")";
            }

            const balanceWei = parseInt(balanceHex, 16);
            const balanceAvax = balanceWei / (10 ** 18);
            
            balanceText.innerText = balanceAvax.toFixed(4) + " AVAX";

            connectBtn.innerText = "Wallet Connected";
            connectBtn.classList.add("cursor-default");

        } catch (error) {
            console.error(error);
            statusText.innerText = "Connection Failed";
            statusText.style.color = "#ef4444";
        }
    } else {
        alert("Wallet tidak terdeteksi! Silakan install Core Wallet atau MetaMask.");
    }
});

if (window.ethereum) {
    window.ethereum.on('accountsChanged', () => {
        window.location.reload();
    });
    window.ethereum.on('chainChanged', () => {
        window.location.reload();
    });
}