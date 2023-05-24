# cnft
## In this project I airdropped compressed NFTs to the users of various protocols on Solana. To obtain their addresses, I examined the transaction structures of each protocol, went through 500,000 solana transaction histories, and also went through thousands of Solana program accounts. 

## Guide to this repository:
### index.js: goes through transaction histories and extracts addresses
### venues.js: helper variables for index.js containing information on each protocol
### drift.js: there were too many spam and failed transactions involving drift protocol, so I analyzed the account structure of drift to extract addresses. I did something similar for mango protocol.
### mint.js: reads the csv file and mints compressed NFTs (reduced cost NFTs) to addresses using the crossmint API
### finalAddrs.csv: contains addresses of all the users of the protocols, the signature from which it was scraped, the index of the instruction in the transaction, the name of the protocol, and the time of the transaction.
