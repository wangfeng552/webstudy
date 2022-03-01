"use strict";
class SelectGirl {
    girls;
    constructor(girls) {
        this.girls = girls;
    }
    getGril(index) {
        return this.girls[index];
    }
}
const selectGirl = new SelectGirl([5, 4, 3, 2]);
console.log(selectGirl.getGril(1));
//# sourceMappingURL=index.js.map