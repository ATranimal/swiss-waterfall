"use strict";

module.exports = class Player {
    constructor (name, region, score) {
        this.name = name;
        this.region = region;
        this.score = score;
    }

    getName() {
        return this.name;
    }

    getRegion() {
        return this.region;
    }

    getScore() {
        return this.score;
    }

    toString() {
        return this.name + " " + this.region + " " + this.score;
    }
}