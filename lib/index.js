#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const clear_1 = __importDefault(require("clear"));
const yargs_1 = __importDefault(require("yargs"));
const hotfixbranch_creator_1 = __importDefault(require("./src/hotfixbranch-creator"));
clear_1.default();
const run = async () => {
    const argv = yargs_1.default
        .command('hotfix', 'Create a hotfix branch')
        .alias('hotfix', 'hf')
        .help()
        .alias('help', 'h')
        .demandCommand()
        .argv;
    console.log(argv);
    if (argv._.includes('hotfix')) {
        console.log("BLUB");
        hotfixbranch_creator_1.default();
    }
};
run();
