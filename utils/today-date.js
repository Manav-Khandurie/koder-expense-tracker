
function getDate(){
    const today = new Date();
    
    const formattedDate = `${today.getFullYear()}-${String(today.getMonth() + 1)}-${today.getDate()}`;

    return formattedDate;
}

module.exports = getDate;