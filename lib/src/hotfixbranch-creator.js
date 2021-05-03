"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promise_1 = __importDefault(require("simple-git/promise"));
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
const createTagHotfixVersion = (tag, tagChoices) => {
    let newHotfixVersion = 1;
    const matches = tag.match(/(\d+\.\d+)-(\d)+/);
    if (matches !== null) {
        newHotfixVersion = parseInt(matches[2]) + 1;
        tag = matches[1] + "-" + newHotfixVersion;
    }
    else {
        tag = tag + "-" + newHotfixVersion;
    }
    if (tagChoices.includes(tag)) {
        tag = createTagHotfixVersion(tag, tagChoices);
    }
    return tag;
};
async function default_1() {
    console.log(chalk_1.default.yellow("This tool will help you create a hotfix branch for the tag you want to hotfix.\n"));
    const git = promise_1.default();
    try {
        await git.fetch();
        const tagList = await git.tags(['-l']);
        if (tagList.all.length === 0) {
            throw "No Tags found. Create a Tag first to release a hotfix.";
        }
        const tagChoices = tagList.all.slice(-4).reverse();
        const questions = [
            {
                type: 'list',
                name: 'tag',
                message: 'Select the tag you wish to create a hotfix for:',
                choices: tagChoices,
                default: tagList.latest
            }
        ];
        const answer = await inquirer_1.default.prompt(questions);
        let tag = answer.tag;
        const tagHotfixVersion = createTagHotfixVersion(tag, tagChoices);
        const hotfixBranch = "hotfix_" + tagHotfixVersion;
        await git.checkoutBranch(hotfixBranch, answer.tag);
        console.log("New hotfix branch " + chalk_1.default.green(hotfixBranch) + " created");
    }
    catch (Exception) {
        console.log(Exception);
    }
}
exports.default = default_1;
