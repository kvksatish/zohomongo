const { Router } = require("express")
const { DataModel } = require("../Models/DataModel")
const axios = require('axios')


const dataController = Router()


dataController.get("/get", async (req, res) => {
    // console.log(req.body)
    debouncedFunction()
    const result = await DataModel.find()
    res.send(result)
})


async function alldata() {
    //  console.log("alldata");

    let result1 = await axios.get("https://zohocrmdata.vercel.app/getdata");
    //console.log(result1.data, 111)

    await new Promise(resolve => setTimeout(resolve, 1000 * 10));

    let result2 = await axios.get("https://zohocrmdata.vercel.app/getdata");
    // console.log(result2.data, 222)
    // Wait for 30 seconds before making the second API call
    await new Promise(resolve => setTimeout(resolve, 1000 * 10));

    let bulkData = await bulkapi(result2.data.accessToken, result1.data.nextGet);

    //console.log(bulkData, 333);
    return bulkData?.data;
}




async function bulkapi(accessToken, nextGet) {
    //  console.log(accessToken, nextGet)
    let data = await axios.get(`https://zohobulkapi.vercel.app/getdata?accessToken=${accessToken}&nextGet=${nextGet}`);
    return data;
}

//////////////////functions//////////////////////

let requestin30min = false

//////////////////////timers////////////////////////


let timeoutId;

function debouncedFunction() {
    // console.log(requestin30min, 1);
    requestin30min = true
    //console.log(requestin30min, 2);
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
        // The actual function implementation goes here
        //console.log(requestin30min, 3);
        requestin30min = false
        //console.log(requestin30min, 4);
        timeoutId = null;
    }, 1000 * 60 * 20);
}



setInterval(() => {
    // console.log(requestin30min, 136)
    if (requestin30min) {
        alldata().then((res) => {
            writeData(res).then((res) => {
                //   console.log("wrote", res)
            }).catch((err) => {
                // console.log(err, 142)
            })
        })
    }
}, 1000 * 60 * 1);


//////////////////writing/////////////////////////

async function writeData(data) {
    // console.log(data, 152152)
    let jdata = {
        "data": data
    }
    // console.log("writedara 150")
    const result = await DataModel.updateOne({ _id: '63da16a4f853f245bb15c049' }, { $set: jdata })
    // console.log("result 152")
    return result
}



module.exports = {
    dataController
}
