
export const calRatingPercentage = (
    ratingTypeCount: number,
    totalRating: number
): string => {
    const cal = (ratingTypeCount / totalRating) * 100
    return `${cal}%`
}

