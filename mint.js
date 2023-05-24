var axios = require("axios");
const fs = require("fs");

var projID = "my crossmint project id";
var key = "my crossmint api secret key";
var config = {
    headers: {
        "x-client-secret": key,
        "x-project-id": projID,
        "content-type": 'application/json',
        'accept': 'application/json'
    }
};

async function mint(addr){
    var data = {
        "recipient": "solana:" + addr,
        "metadata": {
            "name": "Come try Purebet!",
            "image": "https://www.purebet.io/img/Purebet_promo.png",
            "description": "If you received this NFT, you have a $10 risk free bet at Purebet. Visit us at https://purebet.io/ to experience full control over your funds and the highest odds automatically.\nSee our pinned tweet at @Purebet_io for more info",
            "value": "$10"
        }
    };
    try{
        var resp = await axios.post("https://www.crossmint.com/api/v1-alpha1/minting/collections/default-solana/nfts", data, config);
        console.log(addr);
        console.log(resp.data);
    } catch(err){
        if(err.response != null){
            console.error(err.response.data);
            if(err.response.data != null){
                console.error(err.response.data.errors);
            }
        }
        console.error("minting error");
    }     
}

mint("FAWcELVBz8bXLqsn5jB5p1Wo9dVZ9B15qkR7h2wn1niU");

async function readAndMint(){
    //read csv file
    fs.readFile("finalAddrs.csv", "utf-8", async (err, data) => {
        if(err){
            console.error(err);
            return;
        }
        var lines = data.split("\n");
        for(var l = 5100; l < lines.length; l++){
            console.log(l + 1);
            var row = lines[l].split(",");
            var addr = row[0];
            await mint(addr);
        }
    });
    
}
//readAndMint();

