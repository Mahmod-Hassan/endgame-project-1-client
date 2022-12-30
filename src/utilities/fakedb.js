
const addLoveReactToLocal = id => {

    let loveReact = {};
    const storedLoveReactInLocal = localStorage.getItem('love-react');
    if (storedLoveReactInLocal) {
        loveReact = JSON.parse(storedLoveReactInLocal);
    }

    let quantity = loveReact[id];
    if (quantity) {
        const newQuantity = quantity + 1;
        loveReact[id] = newQuantity;
    } else {
        loveReact[id] = 1;
    }
    localStorage.setItem('love-react', JSON.stringify(loveReact));
    return loveReact;
}

// const getLoveReactFromLocal = () => {
//     let loveReact = {};
//     //get loveReact from local storage
//     const storedLoveReactInLocal = localStorage.getItem('love-react');
//     if (storedLoveReactInLocal) {
//         loveReact = JSON.parse(storedLoveReactInLocal);
//     }
//     return loveReact;
// }
export { addLoveReactToLocal };