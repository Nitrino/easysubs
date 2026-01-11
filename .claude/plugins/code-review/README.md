# Code Review Plugin

Automated code review for pull requests using multiple specialized agents with confidence-based scoring to filter false positives.

## Overview

The Code Review Plugin automates pull request review by launching multiple agents in parallel to independently audit changes from different perspectives. It uses confidence scoring to filter out false positives, ensuring only high-quality, actionable feedback is posted.

## Commands

### `/code-review`

Performs automated code review on a pull request using multiple specialized agents.

## Requirements

- Git repository with GitHub integration
- GitHub CLI (`gh`) installed and authenticated
- CLAUDE.md files (optional but recommended for guideline checking)

## Author

Boris Cherny (boris@anthropic.com)

## Version

1.0.0
