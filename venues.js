var info = {
    aver: {
        progAddr: "6q5ZGhEj6kkmEjuyCXuH4x8493bpi9fNzvy9L8hX83HQ",
        numAccounts: 15,
        bettorAddrInd: 0,
        dataLength: 29
    },
    monaco: {
        progAddr: "monacoUXKtUi6vKsQwaLyxmXKSievfNWEcYXTgkbCih",
        numAccounts: 10, //create order instr
        bettorAddrInd: 2, //3rd addr is bettor addr
        dataLength: 44
    },
    divvy: {
        progAddr: "dvyFwAPniptQNb1ey4eM12L8iLHrzdiDsPPDndd6xAR",
        numAccounts: 13,
        bettorAddrInd: 0,
        dataLength: 36
    },
    betdexBeta:{ //use devnet for this obviously
        progAddr: "5Q2hKsxShaPxFqgVtQH3ErTkiBf8NGb99nmpaGw7FCrr",
        numAccounts: 10,
        bettorAddrInd: 2,
        dataLength: 44
    },
    drift: {
        progAddr: "dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH",
        numAccounts: 6,
        bettorAddrInd: 3,
        dataLength: 8 
    },
    mangoNew: {
        progAddr: "4MangoMjqJ2firMokCjjGgoK8d4MXcrgL7XJaL3w6fVg",
        //numAccounts: 19, //could be 15 or 16 as well, so make code to handle numAccounts = null
        bettorAddrInd: 2,
        dataLength: 52
    },
    poolprops: {
        progAddr: "GrcZwT9hSByY1QrUTaRPp6zs5KxAA5QYuqEhjT1wihbm",
        numAccounts: 18,
        bettorAddrInd: 1,
        dataLength: 16
    },
    colosseum: {
        progAddr: "Book8kgaqG4UowjwDZXZcTfPyEjmzmU1zst8ZDqTqiDN",
        numAccounts: 11,
        bettorAddrInd: 4,
        dataLength: 74
    },
    poolparty: {
        progAddr: "57JfdST1qV2upu9fU3E2K2GdQpzJhU36C8n61qnZrGea",
        numAccounts: 13,
        bettorAddrInd: 1,
        dataLength: 17
    },
};

//var list = ["aver", "monaco", "divvy", "drift", "mangoNew", "poolprops", "colosseum", "poolparty"];
//var list = ["drift", "mangoNew", "poolprops", "colosseum", "poolparty"];
//var list = ["poolprops", "colosseum"];//, "poolparty"];
var list = ["drift"];
module.exports = {info, list};