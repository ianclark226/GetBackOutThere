export const arrCrowd = [
    'small',
    'medium',
    'large'
]

export const crowdToIdx = (crowd) => {
    arrCrowd.findIndex((cwd) => cwd.toLowerCase() === crowd.toLowerCase())

    
    
}


export const idxToCrowd = (idx) => {
    return (arrCrowd.filter((_, index) => index === Number(idx)))[0]
}