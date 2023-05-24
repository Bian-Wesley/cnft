var axios = require("axios");
var solanaWeb3 = require("@solana/web3.js");
var bs58 = require("bs58");
var venues = require("./venues.js");
const fs = require('fs');

var shouldSkip = new Set(["DpGzaEHHKnaepTDeLuRn76vgyfvCHVJkaH9S9zpPcB9V"]);
var connection = new solanaWeb3.Connection("solana rpc here", "confirmed");

function lineify(addr, sig, instrNum, venue, date){
    return addr + "," + sig + "," + instrNum + "," + venue + "," + new Date(date * 1000).toISOString() + "\n";
}

function checkDrift(dataArr){
    //45 a1 5d ca 78 7e 4c b9
    var discriminator = [4*16+5, 11, 5*16+13, 12*16+10, 7*16+8, 7*16+14, 4*64+12, 11*16+9];
    for(var d = 0; d < 8; d++){
        if(dataArr[d] != discriminator[d]){
            return false;
        }
    }
    return true;
}

function writeOrPass(txInfo, venue){
    var sig = txInfo.transactionHash;
    var instrs = txInfo.data.transaction.message.instructions;
    var time = txInfo.data.blockTime;
    var rightInd = venues.info[venue].bettorAddrInd;
    var rightAccsNum = venues.info[venue].numAccounts;
    var rightDataLen = venues.info[venue].dataLength;
    for(var i = 0; i < instrs.length; i++){
        //console.log("instr number ", i);
        if(instrs[i].data == null || instrs[i].accounts == null){
            continue; //this means it is a special instruction where solana fm has special fields
        }
        var data = bs58.decode(instrs[i].data);
        //console.log(sig, instrs[i].accounts.length, data.length);
        if(rightDataLen == null || data.length == rightDataLen){
            //if(checkDrift(data)){
            if(rightAccsNum == null || instrs[i].accounts.length == rightAccsNum){
                var toWrite = instrs[i].accounts[rightInd];
                if(shouldSkip.has(toWrite)){
                    continue;
                }
                //write toWrite to a file
                var toAppend = lineify(toWrite, sig, i, venue, time);
                fs.appendFile("addrs.csv", toAppend, err => {
                    if (err) {
                        console.error(err);
                    }
                    console.log(toWrite, " from ", sig, " instr ", i, " protocol ", venue, " date ", time);
                });
                shouldSkip.add(toWrite);
            }
        }
    }
}

async function processTxs(sigArr, venue){
    var payload = {transactionHashes: sigArr};
    var infosRaw = {};
    try{
        infosRaw = await axios.post("https://api.solana.fm/v0/transactions", payload);
    } catch(err){
        if(err.response != null){
            console.error(err.response.data);
            if(err.response.data != null){
                console.error(err.response.data.errors);
            }
        }
        console.log("some sort of axios/solanafm error");
        return;
    }
    
    var txs = infosRaw.data.result;
    for(var t = 0; t < txs.length; t++){
        if(Object.keys(txs[t]).length == 0){
            //per solanafm nacholas response, {} means a tx isn't indexed and should be skipped
            continue;
        }
        //console.log("tx number ", t);
        writeOrPass(txs[t], venue);
    }
}

async function handleProg(venue, startSig){
    var addr = venues.info[venue].progAddr;
    var addrPubKey = new solanaWeb3.PublicKey(addr);
    var sigs = [];
    var alltxs;
    if(startSig == null){
        alltxs = await connection.getSignaturesForAddress(addrPubKey);
    }
    else{
        alltxs = await connection.getSignaturesForAddress(addrPubKey, {before: startSig});
    }
    for(var x = 0; x < alltxs.length; x++){
        sigs.push(alltxs[x].signature);
        if(sigs.length == 50 || x == alltxs.length - 1){
            console.log("sigs batch number ", Math.round(x / 50));
            await processTxs(sigs, venue);
            sigs = [];
        }
    }
    return alltxs.length == 0 ? "nomore" : alltxs[alltxs.length - 1].signature;
    //probably return last sig for use in pagination
}

async function handleProgSuper(venue){
    var startSig = null;
    for(var a = 0; a < 50; a++){
        console.log(venue, " batch number ", a);
        startSig = await handleProg(venue, startSig);
        if(startSig == "nomore"){
            return;
        }
    }
}

async function main(){
    for(var i = 0; i < venues.list.length; i++){
        console.log("venue: ", venues.list[i]);
        await handleProgSuper(venues.list[i]);
    }
}

main();
