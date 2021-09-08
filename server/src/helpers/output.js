module.exports = (val) => {
    if (Array.isArray(val)) {
        val.map((el) => genDateString(el));
    }
    genDateString(val);
};

function genDateString(val) {
    console.log(val);
}
