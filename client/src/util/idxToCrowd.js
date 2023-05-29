export const arrCrowd = [
    'small',
    'medium',
    'large'
]

export const crowdToIdx = (crowd) => {
    return arrCrowd.findIndex((cont) => cont.toLowerCase() === crowd.toLowerCase())
}

export const idxToCrowd = (idx) => {
    return (arrCrowd.filter((_, index) => index === Number(idx)))[0]
}