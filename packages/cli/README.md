# @qiwi/repocrawler-cli
CLI for crawling and making reports
## Crawler
### Usage
```shell
yarn add @qiwi/repocrawler-cli
crawler --vcs gerrit --url http://gerrit.com/a --auth.username username --auth.password password --org common
```
or via npx
```shell
npx -p @qiwi/repocrawler-cli crawler --vcs gerrit --url http://gerrit.com/a --auth.username username --auth.password password --org common
```
You can also use config file:
```shell
crawler --config config.json
```
config.json (you can specify several crawlers):
```json
{
  "org": [
    "common"
  ],
  "crawlers": [
    {
      "vcs": "gerrit",
      "auth": {
        "username": "username",
        "password": "password"
      },
      "url": "https://gerrit.com/a"
    },
    {
      "vcs": "github",
      "auth": "1234567890123456789012345678901234567890",
      "url": "https://github.com/api/v3"
    }
  ]
}
```
or use config file with overriding:
```shell
# override "org" field
crawler --config config.json --org internal

# replace "crawlers" with other one
crawler --config config.json --vcs gerrit --url https://other-gerrit.com/a --auth.username foo --auth.pasword password
```
### Options
| Flag | Description | Default |
|------|-------------|---------|
| vcs | `gerrit` or `github` | mandatory |
| auth | Github API auth token (PAT) if `vcs` === `github` | mandatory if `vcs` === `github` |
| auth.username, auth.password | Gerrit API credentials if `vcs` === `gerrit` | mandatory if `vcs` === `gerrit` |
| url | VCS API url | mandatory |
| out | path to save results for crawling | `node_modules/.cache/@qiwi%2Frepocrawler-cli` |
| config | path to config file | optional |
| limit-count | max count of requests to VCS API per period | 10 |
| limit-period | length of limit period in ms | 2000 |


Last 5 flags can be given in config as top-level values. `vcs`, `auth`, `auth.username`, `auth.password`, `url` should be specified in objects of `crawlers` array field, see example in [Usage](#Usage)
## Reporter
Not implemented
