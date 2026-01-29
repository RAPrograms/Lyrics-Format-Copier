"use strict"

import Processer from "./.Interface.js"

export default class UniqueFilter extends Processer{
    #cache

    constructor(){
        this.#cache = new Set()
    }

    /**
     * @param {string} line
    */
    processLine(line){
        if(line.replace(" ", "") == "")
            return line

        if(this.#cache.has(line))
            return null

        this.#cache.add(line)
        return line
    }

    /**
     * @param {Array<string>} output
    */
    finish(output){}
}