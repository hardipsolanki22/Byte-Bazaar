
export const calRatingPercentage = (
    ratingTypeCount: number,
    totalRating: number
): string => {
    console.log({ ratingTypeCount })
    console.log({ totalRating })
    const cal = (ratingTypeCount / totalRating) * 100
    return `${cal}%`
}

