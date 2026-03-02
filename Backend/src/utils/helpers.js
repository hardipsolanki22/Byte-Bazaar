const aggregatePaginateOption = ({
    page,
    limit,
    customLabels,
    paginate = true
}) => {
    return {
        ...(paginate && {
            page: parseInt(page, 10),
            limit: parseInt(limit, 10),
        }
        ),
        pagination: paginate,
        customLabels: {
            ...customLabels
        }
    }
}

export { aggregatePaginateOption }
