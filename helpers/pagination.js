module.exports = (objectPagination, query, countRecords) => {
    if(query.page){
        objectPagination.currentPage = parseInt(query.page);// trang go tren url chuyen ve int
    }

    if(query.limitItems){
        objectPagination.limitItems = parseInt(query.limitItems);
    }

    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;

    
    const totalPage = Math.ceil(countRecords/objectPagination.limitItems);
    objectPagination.totalPage = totalPage;

    return objectPagination;
}