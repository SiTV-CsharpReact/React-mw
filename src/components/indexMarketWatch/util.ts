// FOR FULLDATA
function getDataIndexFull(data:any) {
    var dataArray = [];
    var json = data; //JSON.parse(data);

    dataArray.push(json.Data.TimeJS);
    dataArray.push(json.Data.Index);

    return dataArray;
}

function getDataVolFull(data:any) {
    var dataVol = [];
    var json = data;//JSON.parse(data);

    dataVol.push(json.Data.TimeJS);
    dataVol.push(json.Data.Vol);

    return dataVol;
}

// FOR SNAPSHOT DATA
function convertToArray(data:any) {
    var dataArray = [];
    var json = data;// JSON.parse(data);

    dataArray.push(json.Data.TimeJS);
    dataArray.push(json.Data.Index);

    return dataArray;
}

export function convertToVol(data:any) {
    var dataVol = [];
    var json = data;//JSON.parse(data);

    dataVol.push(json.Data.TimeJS);
    dataVol.push(json.Data.Vol);

    return dataVol;
}

// // SET Lastest Index VNX
// function setLastIndexHOMin(data:any) {
//     var dataLine = [];
//     dataLine.push(xmin - 10000000);
//     dataLine.push(data);
//     g_thresholdIndex = data;
//     return dataLine;
// }

// function setLastIndexHOMax(data) {
//     var dataLine = [];
//     dataLine.push(xmax + 10000000);
//     dataLine.push(data);
//     return dataLine;
// }