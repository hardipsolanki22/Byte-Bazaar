const aggregatePaginateOption = ({
    page,
    limit,
    customLabels
}) => {
    return {
        page: parseInt(page, 10),
        limit: parseInt(limit, 10),
        pagination: true,
        customLabels: {
            ...customLabels
        }
    }
}

export {aggregatePaginateOption}