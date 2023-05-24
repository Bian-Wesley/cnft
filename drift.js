var solanaWeb3 = require("@solana/web3.js");
var bs58 = require("bs58");
var programID = new solanaWeb3.PublicKey("dRiftyHA39MWEi3m9aunc5MzRF1JYuBsbn6VPcn33UH");
const fs = require('fs');

var filterObj = {
    dataSlice: {
        length: 40, 
        offset: 0
    },
    filters:[
        {
            dataSize: 240
        },
        {
            memcmp: {
                bytes: "WathPFYFksc",
                offset: 0
            }
        },
    ]
};
var connection = new solanaWeb3.Connection("solana rpc url here", "confirmed");
var shouldSkip = new Set(["FnBD7DgBpVG1pEkhWhDayacPfN1qQuUrV2RGRocMb8aX"]);

function lineify(addr, sig, instrNum, venue, date){
    return addr + "," + sig + "," + instrNum + "," + venue + "," + new Date(date * 1000).toISOString() + "\n";
}

async function view(){
    var accs = await connection.getProgramAccounts(programID, filterObj);
    for(var a = 0; a < accs.length; a++){
        var addr = new solanaWeb3.PublicKey(accs[a].account.data.slice(8, 40)).toBase58();
        console.log(addr);
        if(shouldSkip.has(addr)){
            continue;
        }
        var toAppend = lineify(addr, "none", -1, "drift", 0);
        fs.appendFile("driftmango.csv", toAppend, err => {
            if (err) {
                console.error(err);
            }
        });
        shouldSkip.add(addr);
    }
}

view();

