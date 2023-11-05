# @rosmarinus/common-utils

<a href="https://github.com/rosmarinus-project/common-utils/actions/workflows/publish.yml"><img src="https://github.com/rosmarinus-project/common-utils/actions/workflows/publish.yml/badge.svg" alt="build status"></a> <a href="https://pr.new/rosmarinus-project/common-utils"><img src="https://developer.stackblitz.com/img/start_pr_dark_small.svg" alt="Start new PR in StackBlitz Codeflow"></a>

This npm package contains some function encapsulation commonly used in development, which is more engineering-oriented.

# How to Install

```bash
npm i @rosmarinus/common-utils
```

# Functions introduction

1. logger

This module encapsulates chalk as output, and the input parameters are the same as the console module.

2. sleep

This module encapsulates several common delay methods into promise output

3. uuid

This module is a wrapper for the uuid npm library

4. AsyncTask

AsyncTask is an encapsulation of promise and is used in scenarios where calls and callbacks are separated.