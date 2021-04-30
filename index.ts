#!/usr/bin/env node

import chalk from 'chalk'
import clear from 'clear'
import figlet from 'figlet'

import simpleGit from 'simple-git/promise'
import { promisify } from 'util'
import { exec, spawn } from 'child_process'
import inquirer from 'inquirer'

clear()

console.log(
    chalk.yellow(
        figlet.textSync('Git Magic Push', { horizontalLayout: 'full' })
    )
);

const createTagHotfixVersion = (tag:string, tagChoices:Array<string>) => {
    let newHotfixVersion: number = 1
    const matches = tag.match(/(\d+\.\d+)-(\d)+/)

    if (matches !== null) {
        newHotfixVersion = parseInt(matches[2]) + 1
        tag = matches[1] + "-" + newHotfixVersion
    } else {
        tag = tag + "-" + newHotfixVersion
    }

    if (tagChoices.includes(tag)) {
        tag = createTagHotfixVersion(tag, tagChoices)
    }

    return tag;
}

const run = async () => {
    const git = simpleGit()

    try {
        await git.fetch()
        const tagList = await git.tags(['-l'])

        if(tagList.all.length === 0){
            throw "No Tags found. Create a Tag first to release a hotfix."
        }
        const tagChoices = tagList.all.slice(-4).reverse()
        
        const questions = [
            {
                type: 'list',
                name: 'tag',
                message: 'Select the tag you wish to create a hotfix for:',
                choices: tagChoices,
                default: tagList.latest
            }
        ];
        const answer = await inquirer.prompt(questions);
        let tag:string = answer.tag
        const tagHotfixVersion = createTagHotfixVersion(tag, tagChoices)

        await git.checkoutBranch(tagHotfixVersion, answer.tag)
    }catch(Exception){
        console.log(Exception)       
    }
}

run()