export const octokitReposListForOrg = {
  status: 200,
  url: 'https://github.qiwi.com/api/v3/orgs/jslab/repos',
  headers: {
    'access-control-allow-origin': '*',
    'access-control-expose-headers':
      'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type',
    'cache-control': 'private, max-age=60, s-maxage=60',
    connection: 'close',
    'content-encoding': 'gzip',
    'content-security-policy': "default-src 'none'",
    'content-type': 'application/json; charset=utf-8',
    date: 'Fri, 11 Sep 2020 00:58:21 GMT',
    etag: 'W/"e320867827dfda5035dced031722de56"',
    'referrer-policy':
      'origin-when-cross-origin, strict-origin-when-cross-origin',
    server: 'GitHub.com',
    status: '200 OK',
    'strict-transport-security': 'max-age=31536000; includeSubdomains',
    'transfer-encoding': 'chunked',
    vary: 'Accept, Authorization, Cookie, X-GitHub-OTP',
    'x-accepted-oauth-scopes': '',
    'x-content-type-options': 'nosniff',
    'x-frame-options': 'deny',
    'x-github-enterprise-version': '2.20.9',
    'x-github-media-type': 'github.v3; format=json',
    'x-github-request-id': '519e35eb-aa25-4851-a3e3-0204f6450dc6',
    'x-oauth-scopes':
      'gist, read:discussion, read:enterprise, read:gpg_key, read:org, read:public_key, read:repo_hook, read:user, repo',
    'x-runtime-rack': '0.118789',
    'x-xss-protection': '1; mode=block',
  },
  data: [
    {
      id: 1115,
      node_id: 'MDEwOlJlcG9zaXRvcnkxMTE1',
      name: 'qorsproxy',
      full_name: 'jslab/qorsproxy',
      private: false,
      owner: [Object],
      html_url: 'https://github.qiwi.com/jslab/qorsproxy',
      description: 'Yet another cors proxy',
      fork: false,
      url: 'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy',
      forks_url: 'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/forks',
      keys_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/keys{/key_id}',
      collaborators_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/collaborators{/collaborator}',
      teams_url: 'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/teams',
      hooks_url: 'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/hooks',
      issue_events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/issues/events{/number}',
      events_url: 'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/events',
      assignees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/assignees{/user}',
      branches_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/branches{/branch}',
      tags_url: 'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/tags',
      blobs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/git/blobs{/sha}',
      git_tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/git/tags{/sha}',
      git_refs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/git/refs{/sha}',
      trees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/git/trees{/sha}',
      statuses_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/statuses/{sha}',
      languages_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/languages',
      stargazers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/stargazers',
      contributors_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/contributors',
      subscribers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/subscribers',
      subscription_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/subscription',
      commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/commits{/sha}',
      git_commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/git/commits{/sha}',
      comments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/comments{/number}',
      issue_comment_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/issues/comments{/number}',
      contents_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/contents/{+path}',
      compare_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/compare/{base}...{head}',
      merges_url: 'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/merges',
      archive_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/{archive_format}{/ref}',
      downloads_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/downloads',
      issues_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/issues{/number}',
      pulls_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/pulls{/number}',
      milestones_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/milestones{/number}',
      notifications_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/notifications{?since,all,participating}',
      labels_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/labels{/name}',
      releases_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/releases{/id}',
      deployments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/deployments',
      created_at: '2018-01-23T11:46:08Z',
      updated_at: '2018-02-06T16:01:24Z',
      pushed_at: '2018-04-20T12:37:49Z',
      git_url: 'git://github.qiwi.com/jslab/qorsproxy.git',
      ssh_url: 'git@github.qiwi.com:jslab/qorsproxy.git',
      clone_url: 'https://github.qiwi.com/jslab/qorsproxy.git',
      svn_url: 'https://github.qiwi.com/jslab/qorsproxy',
      homepage: '',
      size: 130,
      stargazers_count: 0,
      watchers_count: 0,
      language: 'JavaScript',
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: null,
      forks: 0,
      open_issues: 0,
      watchers: 0,
      default_branch: 'master',
      permissions: [Object],
    },
    {
      id: 1140,
      node_id: 'MDEwOlJlcG9zaXRvcnkxMTQw',
      name: 'health-indicator',
      full_name: 'jslab/health-indicator',
      private: false,
      owner: [Object],
      html_url: 'https://github.qiwi.com/jslab/health-indicator',
      description:
        'Health indicator kit for server-side monitoring & balancing',
      fork: false,
      url: 'https://github.qiwi.com/api/v3/repos/jslab/health-indicator',
      forks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/forks',
      keys_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/keys{/key_id}',
      collaborators_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/collaborators{/collaborator}',
      teams_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/teams',
      hooks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/hooks',
      issue_events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/issues/events{/number}',
      events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/events',
      assignees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/assignees{/user}',
      branches_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/branches{/branch}',
      tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/tags',
      blobs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/git/blobs{/sha}',
      git_tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/git/tags{/sha}',
      git_refs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/git/refs{/sha}',
      trees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/git/trees{/sha}',
      statuses_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/statuses/{sha}',
      languages_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/languages',
      stargazers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/stargazers',
      contributors_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/contributors',
      subscribers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/subscribers',
      subscription_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/subscription',
      commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/commits{/sha}',
      git_commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/git/commits{/sha}',
      comments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/comments{/number}',
      issue_comment_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/issues/comments{/number}',
      contents_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/contents/{+path}',
      compare_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/compare/{base}...{head}',
      merges_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/merges',
      archive_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/{archive_format}{/ref}',
      downloads_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/downloads',
      issues_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/issues{/number}',
      pulls_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/pulls{/number}',
      milestones_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/milestones{/number}',
      notifications_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/notifications{?since,all,participating}',
      labels_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/labels{/name}',
      releases_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/releases{/id}',
      deployments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/health-indicator/deployments',
      created_at: '2018-02-09T10:43:49Z',
      updated_at: '2018-02-09T20:10:30Z',
      pushed_at: '2018-06-13T12:35:32Z',
      git_url: 'git://github.qiwi.com/jslab/health-indicator.git',
      ssh_url: 'git@github.qiwi.com:jslab/health-indicator.git',
      clone_url: 'https://github.qiwi.com/jslab/health-indicator.git',
      svn_url: 'https://github.qiwi.com/jslab/health-indicator',
      homepage: null,
      size: 331,
      stargazers_count: 0,
      watchers_count: 0,
      language: 'JavaScript',
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: [Object],
      forks: 0,
      open_issues: 0,
      watchers: 0,
      default_branch: 'master',
      permissions: [Object],
    },
    {
      id: 1149,
      node_id: 'MDEwOlJlcG9zaXRvcnkxMTQ5',
      name: 'redux-signal-bus',
      full_name: 'jslab/redux-signal-bus',
      private: false,
      owner: [Object],
      html_url: 'https://github.qiwi.com/jslab/redux-signal-bus',
      description: null,
      fork: false,
      url: 'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus',
      forks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/forks',
      keys_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/keys{/key_id}',
      collaborators_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/collaborators{/collaborator}',
      teams_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/teams',
      hooks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/hooks',
      issue_events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/issues/events{/number}',
      events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/events',
      assignees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/assignees{/user}',
      branches_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/branches{/branch}',
      tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/tags',
      blobs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/git/blobs{/sha}',
      git_tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/git/tags{/sha}',
      git_refs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/git/refs{/sha}',
      trees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/git/trees{/sha}',
      statuses_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/statuses/{sha}',
      languages_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/languages',
      stargazers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/stargazers',
      contributors_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/contributors',
      subscribers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/subscribers',
      subscription_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/subscription',
      commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/commits{/sha}',
      git_commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/git/commits{/sha}',
      comments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/comments{/number}',
      issue_comment_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/issues/comments{/number}',
      contents_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/contents/{+path}',
      compare_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/compare/{base}...{head}',
      merges_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/merges',
      archive_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/{archive_format}{/ref}',
      downloads_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/downloads',
      issues_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/issues{/number}',
      pulls_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/pulls{/number}',
      milestones_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/milestones{/number}',
      notifications_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/notifications{?since,all,participating}',
      labels_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/labels{/name}',
      releases_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/releases{/id}',
      deployments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/redux-signal-bus/deployments',
      created_at: '2018-02-14T17:07:14Z',
      updated_at: '2018-02-16T14:01:15Z',
      pushed_at: '2018-07-05T10:11:25Z',
      git_url: 'git://github.qiwi.com/jslab/redux-signal-bus.git',
      ssh_url: 'git@github.qiwi.com:jslab/redux-signal-bus.git',
      clone_url: 'https://github.qiwi.com/jslab/redux-signal-bus.git',
      svn_url: 'https://github.qiwi.com/jslab/redux-signal-bus',
      homepage: null,
      size: 252,
      stargazers_count: 0,
      watchers_count: 0,
      language: 'JavaScript',
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: null,
      forks: 0,
      open_issues: 0,
      watchers: 0,
      default_branch: 'master',
      permissions: [Object],
    },
    {
      id: 1157,
      node_id: 'MDEwOlJlcG9zaXRvcnkxMTU3',
      name: 'decorator-utils',
      full_name: 'jslab/decorator-utils',
      private: false,
      owner: [Object],
      html_url: 'https://github.qiwi.com/jslab/decorator-utils',
      description: 'Tiny helper for js decorator building',
      fork: false,
      url: 'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils',
      forks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/forks',
      keys_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/keys{/key_id}',
      collaborators_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/collaborators{/collaborator}',
      teams_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/teams',
      hooks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/hooks',
      issue_events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/issues/events{/number}',
      events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/events',
      assignees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/assignees{/user}',
      branches_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/branches{/branch}',
      tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/tags',
      blobs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/git/blobs{/sha}',
      git_tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/git/tags{/sha}',
      git_refs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/git/refs{/sha}',
      trees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/git/trees{/sha}',
      statuses_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/statuses/{sha}',
      languages_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/languages',
      stargazers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/stargazers',
      contributors_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/contributors',
      subscribers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/subscribers',
      subscription_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/subscription',
      commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/commits{/sha}',
      git_commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/git/commits{/sha}',
      comments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/comments{/number}',
      issue_comment_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/issues/comments{/number}',
      contents_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/contents/{+path}',
      compare_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/compare/{base}...{head}',
      merges_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/merges',
      archive_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/{archive_format}{/ref}',
      downloads_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/downloads',
      issues_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/issues{/number}',
      pulls_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/pulls{/number}',
      milestones_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/milestones{/number}',
      notifications_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/notifications{?since,all,participating}',
      labels_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/labels{/name}',
      releases_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/releases{/id}',
      deployments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/decorator-utils/deployments',
      created_at: '2018-02-20T12:02:09Z',
      updated_at: '2019-10-15T08:46:37Z',
      pushed_at: '2019-10-15T08:46:35Z',
      git_url: 'git://github.qiwi.com/jslab/decorator-utils.git',
      ssh_url: 'git@github.qiwi.com:jslab/decorator-utils.git',
      clone_url: 'https://github.qiwi.com/jslab/decorator-utils.git',
      svn_url: 'https://github.qiwi.com/jslab/decorator-utils',
      homepage: null,
      size: 475,
      stargazers_count: 0,
      watchers_count: 0,
      language: 'TypeScript',
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: [Object],
      forks: 0,
      open_issues: 0,
      watchers: 0,
      default_branch: 'master',
      permissions: [Object],
    },
    {
      id: 1166,
      node_id: 'MDEwOlJlcG9zaXRvcnkxMTY2',
      name: 'di-container',
      full_name: 'jslab/di-container',
      private: false,
      owner: [Object],
      html_url: 'https://github.qiwi.com/jslab/di-container',
      description: 'Experiments around DI and IoC',
      fork: false,
      url: 'https://github.qiwi.com/api/v3/repos/jslab/di-container',
      forks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/forks',
      keys_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/keys{/key_id}',
      collaborators_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/collaborators{/collaborator}',
      teams_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/teams',
      hooks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/hooks',
      issue_events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/issues/events{/number}',
      events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/events',
      assignees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/assignees{/user}',
      branches_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/branches{/branch}',
      tags_url: 'https://github.qiwi.com/api/v3/repos/jslab/di-container/tags',
      blobs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/git/blobs{/sha}',
      git_tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/git/tags{/sha}',
      git_refs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/git/refs{/sha}',
      trees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/git/trees{/sha}',
      statuses_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/statuses/{sha}',
      languages_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/languages',
      stargazers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/stargazers',
      contributors_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/contributors',
      subscribers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/subscribers',
      subscription_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/subscription',
      commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/commits{/sha}',
      git_commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/git/commits{/sha}',
      comments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/comments{/number}',
      issue_comment_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/issues/comments{/number}',
      contents_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/contents/{+path}',
      compare_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/compare/{base}...{head}',
      merges_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/merges',
      archive_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/{archive_format}{/ref}',
      downloads_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/downloads',
      issues_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/issues{/number}',
      pulls_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/pulls{/number}',
      milestones_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/milestones{/number}',
      notifications_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/notifications{?since,all,participating}',
      labels_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/labels{/name}',
      releases_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/releases{/id}',
      deployments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/di-container/deployments',
      created_at: '2018-02-22T13:12:23Z',
      updated_at: '2018-02-27T14:55:24Z',
      pushed_at: '2018-04-23T10:00:06Z',
      git_url: 'git://github.qiwi.com/jslab/di-container.git',
      ssh_url: 'git@github.qiwi.com:jslab/di-container.git',
      clone_url: 'https://github.qiwi.com/jslab/di-container.git',
      svn_url: 'https://github.qiwi.com/jslab/di-container',
      homepage: null,
      size: 141,
      stargazers_count: 0,
      watchers_count: 0,
      language: 'JavaScript',
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: [Object],
      forks: 0,
      open_issues: 0,
      watchers: 0,
      default_branch: 'master',
      permissions: [Object],
    },
    {
      id: 1187,
      node_id: 'MDEwOlJlcG9zaXRvcnkxMTg3',
      name: 'requirements',
      full_name: 'jslab/requirements',
      private: false,
      owner: [Object],
      html_url: 'https://github.qiwi.com/jslab/requirements',
      description: 'Общие требования к фронтовым проектам',
      fork: false,
      url: 'https://github.qiwi.com/api/v3/repos/jslab/requirements',
      forks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/forks',
      keys_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/keys{/key_id}',
      collaborators_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/collaborators{/collaborator}',
      teams_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/teams',
      hooks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/hooks',
      issue_events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/issues/events{/number}',
      events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/events',
      assignees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/assignees{/user}',
      branches_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/branches{/branch}',
      tags_url: 'https://github.qiwi.com/api/v3/repos/jslab/requirements/tags',
      blobs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/git/blobs{/sha}',
      git_tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/git/tags{/sha}',
      git_refs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/git/refs{/sha}',
      trees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/git/trees{/sha}',
      statuses_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/statuses/{sha}',
      languages_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/languages',
      stargazers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/stargazers',
      contributors_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/contributors',
      subscribers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/subscribers',
      subscription_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/subscription',
      commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/commits{/sha}',
      git_commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/git/commits{/sha}',
      comments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/comments{/number}',
      issue_comment_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/issues/comments{/number}',
      contents_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/contents/{+path}',
      compare_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/compare/{base}...{head}',
      merges_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/merges',
      archive_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/{archive_format}{/ref}',
      downloads_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/downloads',
      issues_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/issues{/number}',
      pulls_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/pulls{/number}',
      milestones_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/milestones{/number}',
      notifications_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/notifications{?since,all,participating}',
      labels_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/labels{/name}',
      releases_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/releases{/id}',
      deployments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/requirements/deployments',
      created_at: '2018-03-16T12:16:22Z',
      updated_at: '2018-03-28T10:55:42Z',
      pushed_at: '2018-09-18T11:22:13Z',
      git_url: 'git://github.qiwi.com/jslab/requirements.git',
      ssh_url: 'git@github.qiwi.com:jslab/requirements.git',
      clone_url: 'https://github.qiwi.com/jslab/requirements.git',
      svn_url: 'https://github.qiwi.com/jslab/requirements',
      homepage: null,
      size: 53,
      stargazers_count: 1,
      watchers_count: 1,
      language: null,
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: null,
      forks: 0,
      open_issues: 0,
      watchers: 1,
      default_branch: 'master',
      permissions: [Object],
    },
    {
      id: 1188,
      node_id: 'MDEwOlJlcG9zaXRvcnkxMTg4',
      name: 'interview',
      full_name: 'jslab/interview',
      private: false,
      owner: [Object],
      html_url: 'https://github.qiwi.com/jslab/interview',
      description:
        'Базовый список тем и вопросов для бесед с соискателями JS вакансий',
      fork: false,
      url: 'https://github.qiwi.com/api/v3/repos/jslab/interview',
      forks_url: 'https://github.qiwi.com/api/v3/repos/jslab/interview/forks',
      keys_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/keys{/key_id}',
      collaborators_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/collaborators{/collaborator}',
      teams_url: 'https://github.qiwi.com/api/v3/repos/jslab/interview/teams',
      hooks_url: 'https://github.qiwi.com/api/v3/repos/jslab/interview/hooks',
      issue_events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/issues/events{/number}',
      events_url: 'https://github.qiwi.com/api/v3/repos/jslab/interview/events',
      assignees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/assignees{/user}',
      branches_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/branches{/branch}',
      tags_url: 'https://github.qiwi.com/api/v3/repos/jslab/interview/tags',
      blobs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/git/blobs{/sha}',
      git_tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/git/tags{/sha}',
      git_refs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/git/refs{/sha}',
      trees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/git/trees{/sha}',
      statuses_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/statuses/{sha}',
      languages_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/languages',
      stargazers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/stargazers',
      contributors_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/contributors',
      subscribers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/subscribers',
      subscription_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/subscription',
      commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/commits{/sha}',
      git_commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/git/commits{/sha}',
      comments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/comments{/number}',
      issue_comment_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/issues/comments{/number}',
      contents_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/contents/{+path}',
      compare_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/compare/{base}...{head}',
      merges_url: 'https://github.qiwi.com/api/v3/repos/jslab/interview/merges',
      archive_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/{archive_format}{/ref}',
      downloads_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/downloads',
      issues_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/issues{/number}',
      pulls_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/pulls{/number}',
      milestones_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/milestones{/number}',
      notifications_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/notifications{?since,all,participating}',
      labels_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/labels{/name}',
      releases_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/releases{/id}',
      deployments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/interview/deployments',
      created_at: '2018-03-16T12:25:50Z',
      updated_at: '2019-09-12T08:47:40Z',
      pushed_at: '2018-07-09T14:26:11Z',
      git_url: 'git://github.qiwi.com/jslab/interview.git',
      ssh_url: 'git@github.qiwi.com:jslab/interview.git',
      clone_url: 'https://github.qiwi.com/jslab/interview.git',
      svn_url: 'https://github.qiwi.com/jslab/interview',
      homepage: null,
      size: 0,
      stargazers_count: 1,
      watchers_count: 1,
      language: null,
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: null,
      forks: 0,
      open_issues: 0,
      watchers: 1,
      default_branch: 'master',
      permissions: [Object],
    },
    {
      id: 1198,
      node_id: 'MDEwOlJlcG9zaXRvcnkxMTk4',
      name: 'card-info-api',
      full_name: 'jslab/card-info-api',
      private: true,
      owner: [Object],
      html_url: 'https://github.qiwi.com/jslab/card-info-api',
      description: 'Service for getting card details by its PAN',
      fork: false,
      url: 'https://github.qiwi.com/api/v3/repos/jslab/card-info-api',
      forks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/forks',
      keys_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/keys{/key_id}',
      collaborators_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/collaborators{/collaborator}',
      teams_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/teams',
      hooks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/hooks',
      issue_events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/issues/events{/number}',
      events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/events',
      assignees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/assignees{/user}',
      branches_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/branches{/branch}',
      tags_url: 'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/tags',
      blobs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/git/blobs{/sha}',
      git_tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/git/tags{/sha}',
      git_refs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/git/refs{/sha}',
      trees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/git/trees{/sha}',
      statuses_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/statuses/{sha}',
      languages_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/languages',
      stargazers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/stargazers',
      contributors_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/contributors',
      subscribers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/subscribers',
      subscription_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/subscription',
      commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/commits{/sha}',
      git_commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/git/commits{/sha}',
      comments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/comments{/number}',
      issue_comment_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/issues/comments{/number}',
      contents_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/contents/{+path}',
      compare_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/compare/{base}...{head}',
      merges_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/merges',
      archive_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/{archive_format}{/ref}',
      downloads_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/downloads',
      issues_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/issues{/number}',
      pulls_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/pulls{/number}',
      milestones_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/milestones{/number}',
      notifications_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/notifications{?since,all,participating}',
      labels_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/labels{/name}',
      releases_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/releases{/id}',
      deployments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/card-info-api/deployments',
      created_at: '2018-04-03T11:42:11Z',
      updated_at: '2018-04-03T11:42:11Z',
      pushed_at: '2018-04-03T11:42:15Z',
      git_url: 'git://github.qiwi.com/jslab/card-info-api.git',
      ssh_url: 'git@github.qiwi.com:jslab/card-info-api.git',
      clone_url: 'https://github.qiwi.com/jslab/card-info-api.git',
      svn_url: 'https://github.qiwi.com/jslab/card-info-api',
      homepage: null,
      size: 0,
      stargazers_count: 0,
      watchers_count: 0,
      language: null,
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: null,
      forks: 0,
      open_issues: 0,
      watchers: 0,
      default_branch: 'master',
      permissions: [Object],
    },
    {
      id: 1255,
      node_id: 'MDEwOlJlcG9zaXRvcnkxMjU1',
      name: 'qiwi-ui',
      full_name: 'jslab/qiwi-ui',
      private: false,
      owner: [Object],
      html_url: 'https://github.qiwi.com/jslab/qiwi-ui',
      description: null,
      fork: false,
      url: 'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui',
      forks_url: 'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/forks',
      keys_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/keys{/key_id}',
      collaborators_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/collaborators{/collaborator}',
      teams_url: 'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/teams',
      hooks_url: 'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/hooks',
      issue_events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/issues/events{/number}',
      events_url: 'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/events',
      assignees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/assignees{/user}',
      branches_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/branches{/branch}',
      tags_url: 'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/tags',
      blobs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/git/blobs{/sha}',
      git_tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/git/tags{/sha}',
      git_refs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/git/refs{/sha}',
      trees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/git/trees{/sha}',
      statuses_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/statuses/{sha}',
      languages_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/languages',
      stargazers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/stargazers',
      contributors_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/contributors',
      subscribers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/subscribers',
      subscription_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/subscription',
      commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/commits{/sha}',
      git_commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/git/commits{/sha}',
      comments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/comments{/number}',
      issue_comment_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/issues/comments{/number}',
      contents_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/contents/{+path}',
      compare_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/compare/{base}...{head}',
      merges_url: 'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/merges',
      archive_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/{archive_format}{/ref}',
      downloads_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/downloads',
      issues_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/issues{/number}',
      pulls_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/pulls{/number}',
      milestones_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/milestones{/number}',
      notifications_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/notifications{?since,all,participating}',
      labels_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/labels{/name}',
      releases_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/releases{/id}',
      deployments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/qiwi-ui/deployments',
      created_at: '2018-06-25T11:00:28Z',
      updated_at: '2018-06-25T11:00:28Z',
      pushed_at: '2018-07-04T11:39:39Z',
      git_url: 'git://github.qiwi.com/jslab/qiwi-ui.git',
      ssh_url: 'git@github.qiwi.com:jslab/qiwi-ui.git',
      clone_url: 'https://github.qiwi.com/jslab/qiwi-ui.git',
      svn_url: 'https://github.qiwi.com/jslab/qiwi-ui',
      homepage: null,
      size: 901,
      stargazers_count: 0,
      watchers_count: 0,
      language: null,
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: null,
      forks: 0,
      open_issues: 0,
      watchers: 0,
      default_branch: 'master',
      permissions: [Object],
    },
    {
      id: 2465,
      node_id: 'MDEwOlJlcG9zaXRvcnkyNDY1',
      name: 'edu-buildtime-microfront',
      full_name: 'jslab/edu-buildtime-microfront',
      private: true,
      owner: [Object],
      html_url: 'https://github.qiwi.com/jslab/edu-buildtime-microfront',
      description: null,
      fork: false,
      url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront',
      forks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/forks',
      keys_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/keys{/key_id}',
      collaborators_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/collaborators{/collaborator}',
      teams_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/teams',
      hooks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/hooks',
      issue_events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/issues/events{/number}',
      events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/events',
      assignees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/assignees{/user}',
      branches_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/branches{/branch}',
      tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/tags',
      blobs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/git/blobs{/sha}',
      git_tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/git/tags{/sha}',
      git_refs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/git/refs{/sha}',
      trees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/git/trees{/sha}',
      statuses_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/statuses/{sha}',
      languages_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/languages',
      stargazers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/stargazers',
      contributors_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/contributors',
      subscribers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/subscribers',
      subscription_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/subscription',
      commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/commits{/sha}',
      git_commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/git/commits{/sha}',
      comments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/comments{/number}',
      issue_comment_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/issues/comments{/number}',
      contents_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/contents/{+path}',
      compare_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/compare/{base}...{head}',
      merges_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/merges',
      archive_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/{archive_format}{/ref}',
      downloads_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/downloads',
      issues_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/issues{/number}',
      pulls_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/pulls{/number}',
      milestones_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/milestones{/number}',
      notifications_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/notifications{?since,all,participating}',
      labels_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/labels{/name}',
      releases_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/releases{/id}',
      deployments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/edu-buildtime-microfront/deployments',
      created_at: '2020-07-14T15:01:45Z',
      updated_at: '2020-08-03T09:42:19Z',
      pushed_at: '2020-08-10T14:22:13Z',
      git_url: 'git://github.qiwi.com/jslab/edu-buildtime-microfront.git',
      ssh_url: 'git@github.qiwi.com:jslab/edu-buildtime-microfront.git',
      clone_url: 'https://github.qiwi.com/jslab/edu-buildtime-microfront.git',
      svn_url: 'https://github.qiwi.com/jslab/edu-buildtime-microfront',
      homepage: null,
      size: 349,
      stargazers_count: 2,
      watchers_count: 2,
      language: 'TypeScript',
      has_issues: true,
      has_projects: false,
      has_downloads: true,
      has_wiki: false,
      has_pages: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 11,
      license: null,
      forks: 0,
      open_issues: 11,
      watchers: 2,
      default_branch: 'master',
      permissions: [Object],
    },
    {
      id: 2530,
      node_id: 'MDEwOlJlcG9zaXRvcnkyNTMw',
      name: 'dummy-monorepo-lib',
      full_name: 'jslab/dummy-monorepo-lib',
      private: false,
      owner: [Object],
      html_url: 'https://github.qiwi.com/jslab/dummy-monorepo-lib',
      description: 'Dummy js monorepo library for experiments',
      fork: false,
      url: 'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib',
      forks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/forks',
      keys_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/keys{/key_id}',
      collaborators_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/collaborators{/collaborator}',
      teams_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/teams',
      hooks_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/hooks',
      issue_events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/issues/events{/number}',
      events_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/events',
      assignees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/assignees{/user}',
      branches_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/branches{/branch}',
      tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/tags',
      blobs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/git/blobs{/sha}',
      git_tags_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/git/tags{/sha}',
      git_refs_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/git/refs{/sha}',
      trees_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/git/trees{/sha}',
      statuses_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/statuses/{sha}',
      languages_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/languages',
      stargazers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/stargazers',
      contributors_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/contributors',
      subscribers_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/subscribers',
      subscription_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/subscription',
      commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/commits{/sha}',
      git_commits_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/git/commits{/sha}',
      comments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/comments{/number}',
      issue_comment_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/issues/comments{/number}',
      contents_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/contents/{+path}',
      compare_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/compare/{base}...{head}',
      merges_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/merges',
      archive_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/{archive_format}{/ref}',
      downloads_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/downloads',
      issues_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/issues{/number}',
      pulls_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/pulls{/number}',
      milestones_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/milestones{/number}',
      notifications_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/notifications{?since,all,participating}',
      labels_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/labels{/name}',
      releases_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/releases{/id}',
      deployments_url:
        'https://github.qiwi.com/api/v3/repos/jslab/dummy-monorepo-lib/deployments',
      created_at: '2020-08-27T07:13:12Z',
      updated_at: '2020-09-02T07:28:51Z',
      pushed_at: '2020-09-02T07:28:54Z',
      git_url: 'git://github.qiwi.com/jslab/dummy-monorepo-lib.git',
      ssh_url: 'git@github.qiwi.com:jslab/dummy-monorepo-lib.git',
      clone_url: 'https://github.qiwi.com/jslab/dummy-monorepo-lib.git',
      svn_url: 'https://github.qiwi.com/jslab/dummy-monorepo-lib',
      homepage: null,
      size: 458,
      stargazers_count: 0,
      watchers_count: 0,
      language: 'JavaScript',
      has_issues: true,
      has_projects: true,
      has_downloads: true,
      has_wiki: true,
      has_pages: false,
      forks_count: 0,
      mirror_url: null,
      archived: false,
      disabled: false,
      open_issues_count: 0,
      license: null,
      forks: 0,
      open_issues: 0,
      watchers: 0,
      default_branch: 'master',
      permissions: [Object],
    },
  ],
}
