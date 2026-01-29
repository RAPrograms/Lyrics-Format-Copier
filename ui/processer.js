"use strict"

import Processer from "./processers/.Interface.js"

import ChunckFilter from "./processers/chunckFilter.js"
import UniqueFilter from "./processers/UniqueFilter.js"
import LinesCondenser from "./processers/Condensor.js"

/**
 * Returns an array of processers given the formdata with options
 * @param {FormData} config 
 * 
 * @returns {Array<Processer>}
 */
function loadProcessers(config){
    if(config.get("unique") == "on" && config.get("condence") == "on")
        throw new Error("Enabled processor conflict - Unique vs Line Condensor")

    const output = []

    if(config.get("unique") == "on")
        output.push(new UniqueFilter())
    
    if(config.get("section_names") == "off")
        output.push(new ChunckFilter("[", "]"))

    if(config.get("back_lyrics") == "off")
        output.push(new ChunckFilter("(", ")"))

    if(config.get("condense_lines") == "on")
        output.push(new LinesCondenser())

    return output
}

/**
 * Runs though each line applying the processers
 * @param {Array<string>} content
 * @param {FormData} config 
 * 
 * @returns {Array<string>}
 */
export default function process(content, config){
    const processers = loadProcessers(config)
    const output = []

    for(let line of content){
        for(const processer of processers){
            line = processer.processLine(line, output)
            if(line == null)
                break
        }
        
        if(line != null)
            output.push(line)
    }

    for(const processer of processers){
        processer.finish(output)
    }

    return output
}