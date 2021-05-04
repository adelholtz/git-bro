# git-bro

## Install and Setup

Stable version

```bash
yarn global add adelholtz/git-magic.git#stable
```

For experimental features use

```bash
yarn global add adelholtz/git-magic.git#dev
```

Now the package is available fro global use.

Type git-bro in the console to get a list of available commands.

```bash
git-bro <command>

Commands:
  git-bro hotfix  Create a hotfix branch

Options:
      --version  Show version number                                   [boolean]
  -h, --help     Show help                                             [boolean]

Not enough non-option arguments: got 0, need at least 1
```

## Hotfixing

```bash
git-bro hotfix
```

Will give you a list of the last 5 created Tags from which you can choose the Tag you want to create a hotfix for.

Let's say you want to create a hotfix for Tag 1.23.
Selet the tag from the list. And you will get a message that tells you that a new branch 1.23-1 was created.

The newly created branch follows the fronted gitlab hotfix convention: version.minorVersion-hotfix

Once the fix is applied in the branch commit your changes and create a new tag release out of the branch.
