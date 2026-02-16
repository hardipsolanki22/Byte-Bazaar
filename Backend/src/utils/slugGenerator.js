import slugify from 'slugify'

// Configure slugify options
const slugifyConfig = {
    lower: true,
    strict: true,
    trim: true
};


export const generateSlug = (name) => {
    return slugify(name, slugifyConfig)
}