#!/usr/bin/env node

import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'

import simpleGit from 'simple-git/promise'
import { promisify } from 'util'
import { exec, spawn } from 'child_process'

clear()

console.log(
    chalk.yellow(
        figlet.textSync('Git Magic Push', { horizontalLayout: 'full' })
    )
);

const run = async () => {
    const git = simpleGit()

    try {
        const execPromisified = promisify(exec)
        const { stdout, stderr } = await execPromisified("git push")
        // const result = await git.push()
        console.log("out", stdout)
        console.log("err",stderr)
    }catch(Exception){
        console.log(Exception)
        // const upstreamError = Exception.message.match(/git push --set-upstream\s.+/);

        // // handle upstream not set error
        // if(upstreamError.length > 0){
        //     exec(upstreamError[0], (error, stdout, stderr) => {
        //         if (error) {
        //             console.log(`error: ${error.message}`);
        //             return;
        //         }
        //         if (stderr) {
        //             console.log(`stderr: ${stderr}`);
        //             return;
        //         }
        //         console.log(`stdout: ${stdout}`);
        //     })
        // }
        
    }
}

run()