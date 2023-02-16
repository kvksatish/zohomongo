const { Router } = require("express")
const { DataModel } = require("../Models/DataModel")
const axios = require('axios')


const dataController = Router()



// dataController.put("/update", async (req, res) => {
//    // console.log(req.body)
//     const result = await DataModel.updateOne({ _id: '63da16a4f853f245bb15c049' }, { $set: req.body })
//     res.send(result)


// })
dataController.get("/get", async (req, res) => {
    // console.log(req.body)
    debouncedFunction()
    const result = await DataModel.find()
    res.send(result)
})


// dataController.post("/adddata", async (req, res) => {
//     console.log("post")
//     const payload = req.body
//     const new_topic = new DataModel(payload)
//     await new_topic.save()
//     res.send("successfully added")
// })
module.exports = {
    dataController
}



//////////////////////////////////////////////////////


// async function fetcher1() {
//     let pres = await Promise.all(

//         [
//             axios.get(`https://zohocrmdata.vercel.app/getdata?page=1`),
//             axios.get(`https://zohoapi2.vercel.app/getdata?page=2`),
//             axios.get(`https://zohocrmdata.vercel.app/getdata?page=3`),
//         ]
//     )
//     ////////
//     let arr = [
//         ...pres[0].data.data.data,
//         ...pres[1].data.data.data,
//         ...pres[2].data.data.data,
//     ]

//     return arr
// }

// async function fetcher2() {
//     let pres = await Promise.all(

//         [
//             axios.get(`https://zohoapi2.vercel.app/getdata?page=4`),
//             axios.get(`https://zohocrmdata.vercel.app/getdata?page=5`),
//             axios.get(`https://zohoapi2.vercel.app/getdata?page=6`),
//         ]
//     )

//     let arr = [
//         ...pres[0].data.data.data,
//         ...pres[1].data.data.data,
//         ...pres[2].data.data.data,
//     ]

//     return arr
// }
// async function fetcher3() {
//     let pres = await Promise.all(

//         [
//             axios.get(`https://zohocrmdata.vercel.app/getdata?page=7`),
//             axios.get(`https://zohoapi2.vercel.app/getdata?page=8`),
//             axios.get(`https://zohocrmdata.vercel.app/getdata?page=9`),
//         ]
//     )

//     let arr = [
//         ...pres[0].data.data.data,
//         ...pres[1].data.data.data,
//         ...pres[2].data.data.data,
//     ]

//     return arr
// }

async function alldata() {
    console.log("alldata");

    let result1 = await axios.get("https://zohocrmdata.vercel.app/getdata");
    console.log(result1.data, 111)

    await new Promise(resolve => setTimeout(resolve, 1000 * 10));

    let result2 = await axios.get("https://zohocrmdata.vercel.app/getdata");
    console.log(result2.data, 222)
    // Wait for 30 seconds before making the second API call
    await new Promise(resolve => setTimeout(resolve, 1000 * 10));

    let bulkData = await bulkapi(result2.data.accessToken, result1.data.nextGet);

    console.log(bulkData, 333);
    return bulkData?.data;
}




async function bulkapi(accessToken, nextGet) {
    console.log(accessToken, nextGet)
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
    console.log(requestin30min, 136)
    if (requestin30min) {
        alldata().then((res) => {
            writeData(res).then((res) => {
                console.log("wrote", res)
            }).catch((err) => {
                console.log(err, 142)
            })
        })
    }
}, 1000 * 60 * 1);


//////////////////writing/////////////////////////

async function writeData(data) {
    console.log(data, 152152)
    let jdata = {
        "data": data
    }
    console.log("writedara 150")
    const result = await DataModel.updateOne({ _id: '63da16a4f853f245bb15c049' }, { $set: jdata })
    console.log("result 152")
    return result
}