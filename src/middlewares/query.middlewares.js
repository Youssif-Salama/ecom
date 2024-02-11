// this middleware take model name as param and req promise of document

// 1-add one document in collection

export const attachAddOne = (model) => {
    return (req, res, next) => {
        req.dbQuery = model.create(req.body)
        next()
    }
}

// 2- get  documents in a collection

export const attachGet = (model) => {
    return (req, res, next) => {
        req.dbQuery = model.find({})
        next()
    }
}

// 3- update documents 

export const attachUpdate = (model) => {

    return (req, res, next) => {
        req.dbQuery = model.updateMany({}, req.body)
        next()
    }


}

// 4- delete documents

export const attachDelete = (model) => {

    return (req, res, next) => {
        req.dbQuery = model.deleteMany({})
        next()
    }

}