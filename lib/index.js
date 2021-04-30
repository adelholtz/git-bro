#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const clear_1 = __importDefault(require("clear"));
const figlet_1 = __importDefault(require("figlet"));
const promise_1 = __importDefault(require("simple-git/promise"));
const inquirer_1 = __importDefault(require("inquirer"));
clear_1.default();
console.log(chalk_1.default.yellow(figlet_1.default.textSync('Git Magic Push', { horizontalLayout: 'full' })));
const createTagHotfixVersion = (tag, tagChoices) => {
    let newHotfixVersion = 1;
    const matches = tag.match(/(\d+\.\d+)-(\d)+/);
    if (matches !== null) {
        console.log(matches);
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
const run = async () => {
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
        console.log(tagHotfixVersion);
    }
    catch (Exception) {
        console.log(Exception);
    }
};
run();
