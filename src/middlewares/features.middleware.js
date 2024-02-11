
export const filterOne = ({ fieldName, paramName }) => {
	return (req, res, next) => {
		req.dbQuery = req.dbQuery.where({ [fieldName]: req.params[paramName] })
		next()
	}
}


export const paginateQuery = (pageSize = 2) =>
	(req, res, next) => {
		let page = +req.query.page || 1;
		if (page < 1) page = 1

		req.dbQuery = req.dbQuery.skip((page - 1) * pageSize).limit(pageSize)

		next()
	}

export const populateQuery = (fieldName) => (req, res, next) => {
	req.dbQuery = req.dbQuery.populate(fieldName)
	next()
}

export const sortQuery = () => (req, res, next) => {
	const { sort, dir = 'asc' } = req.query
	if (!sort) return next()
	req.dbQuery = req.dbQuery.sort({ [sort]: dir })
	next()
}

export const selectFieldsQuery = () => (req, res, next) => {
	const { fields } = req.query
	if (!fields) return next()
	req.dbQuery = req.dbQuery.select(fields.split(','))
	next()
}

export const searchQuery =
	(fieldsToSearch = ['title', 'description']) =>
		(req, res, next) => {
			const { keyword } = req.query

			if (!keyword) return next()

			const regex = new RegExp(keyword, 'i')

			let regexQuery = fieldsToSearch.map((field) => {
				return { [field]: regex }
			})

			regexQuery = { $or: regexQuery }

			req.dbQuery = req.dbQuery.find(regexQuery)
			next()
		}

export const filterQuery = () => (req, res, next) => {
	const filterFields = { ...req.query }
	const exclusionList = ['page', 'sort', 'keyword', 'fields', 'dir']

	exclusionList.forEach((item) => {
		delete filterFields[item]
	})

	const filterFieldsString = JSON.stringify(filterFields)

	const modifiedFilterFieldsString = filterFieldsString.replace(
		/(lt|lte|gt|gte)/g,
		(match) => `$${match}`
	)

	const modifiedFilterFields = JSON.parse(modifiedFilterFieldsString)

	req.dbQuery = req.dbQuery.where(modifiedFilterFields)

	next()
}
