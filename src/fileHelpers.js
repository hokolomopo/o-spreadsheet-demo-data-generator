import fs from 'fs'

export function writeToFile(file, data){
    fs.writeFileSync( file, data )
}
