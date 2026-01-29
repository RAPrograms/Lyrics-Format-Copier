"use strict"

import Processer from "./.Interface.js"

export default class ChunckFilter extends Processer{
    #target

    constructor(start, end){
        super()
        this.#target = [start, end]
    }

    /**
     * @param {string} line
    */
    processLine(line){
        let used = false
        let output = ""
        let outputting = true

        for(const char of line){
            if(outputting){
                if(char == this.#target[0]){
                    outputting = false
                    used = true
                    continue
                }

                output += char
                continue
            }
            
            if(char == this.#target[1])
                outputting = true
        }

        if(used && output == "")
            return null

        return output
    }

    finish(){}
}