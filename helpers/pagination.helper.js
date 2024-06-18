module.exports = (req, countJob) => {
    const objectPagination = {
        currentPage: 1,
        limitItems: 4
    }
    if(req.query.page) {
        objectPagination.currentPage = parseInt(req.query.page);
    }
    objectPagination.skip = (objectPagination.currentPage - 1) * objectPagination.limitItems;
    objectPagination.totalPage = Math.ceil(countJob/objectPagination.limitItems);
    return objectPagination;
  }