#!/usr/bin/env node
import clear from 'clear'
import yargs from 'yargs'
import createHotfixBranch from './src/hotfixbranch-creator'

clear()


const run = async () => {
    const argv = yargs
        .command('hotfix','Create a hotfix branch')
        .help()
        .alias('help', 'h')
        .demandCommand()
        .argv

    if (argv._.includes('hotfix')){
        createHotfixBranch()
    }
}

run()