const calculateRange = (data, rowsPerPage) => {
    // console.log("Data: ", data);
    const range = [];
    const num = Math.ceil(data.length / rowsPerPage);
    for (let i = 1; i <= num; i++) {
        range.push(i);
    }
    return range;
}

const sliceData = (data, page, rowsPerPage) => {
    console.log("Data: ", data);
    return data.slice((page - 1) * rowsPerPage, page * rowsPerPage);
}  

export {
    calculateRange,
    sliceData
}