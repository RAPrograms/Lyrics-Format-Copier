"use strict"

import Processer from "./.Interface.js"

export default class LinesCondenser extends Processer{
    #count

    constructor(){
        super()
        this.#count = 0
    }

    /**
     * @param {string} line
     * @param {Array<string>} output
    */
    processLine(line, output){
        const lastline = output[output.length - 1]
        if(lastline != line){
            this.addApplicableCount(output)

            this.#count = 1
            return line
        }

        this.#count += 1
        return null
    }


    addApplicableCount(output){
        if(this.#count > 1)
            output[output.length - 1] += ` [x${this.#count}]`
    }

}

LinesCondenser.prototype.finish = LinesCondenser.prototype.addApplicableCount;