import simpleGit from 'simple-git/promise'
import inquirer from 'inquirer'
import chalk from 'chalk'

const createTagHotfixVersion = (tag: string, tagChoices: Array<string>) => {
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

export default async function () {
    console.log(
        chalk.yellow(
            "This tool will help you create a hotfix branch for the tag you want to hotfix.\n"
        )
    );

    const git = simpleGit()

    try {
        await git.fetch()
        const tagList = await git.tags(['-l'])

        if (tagList.all.length === 0) {
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
        let tag: string = answer.tag
        const tagHotfixVersion = createTagHotfixVersion(tag, tagChoices)
        const hotfixBranch = "hotfix_" + tagHotfixVersion

        await git.checkoutBranch(hotfixBranch, answer.tag)
        
        console.log("New hotfix branch " + chalk.green(hotfixBranch) + " created")
    } catch (Exception) {
        console.log(Exception)
    }
}