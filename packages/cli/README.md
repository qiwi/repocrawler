# @qiwi/repocrawler-cli
CLI for crawling and making reports
## Usage
### Crawler
```shell
yarn add @qiwi/repocrawler-cli
crawler --vcs gerrit --url http://gerrit.com/a --auth.username username --auth.password password --org common
```
or via npx
```shell
npx -p @qiwi/repocrawler-cli crawler --vcs gerrit --url http://gerrit.com/a --auth.username username --auth.password password --org common
```
### Reporter
