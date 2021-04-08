export const octokitReposGetContent = {
  status: 200,
  url:
    'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/contents/package.json',
  headers: {
    'access-control-allow-origin': '*',
    'access-control-expose-headers':
      'ETag, Link, Location, Retry-After, X-GitHub-OTP, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes, X-Poll-Interval, X-GitHub-Media-Type',
    'cache-control': 'private, max-age=60, s-maxage=60',
    connection: 'close',
    'content-encoding': 'gzip',
    'content-security-policy': "default-src 'none'",
    'content-type': 'application/json; charset=utf-8',
    date: 'Fri, 11 Sep 2020 02:18:32 GMT',
    etag: 'W/"e06c5fe778fc557e877f15467fbc081dd869faee"',
    'last-modified': 'Fri, 20 Apr 2018 12:36:26 GMT',
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
    'x-github-request-id': '2d762d8d-4292-43f6-a81f-ec8bd642f9b5',
    'x-oauth-scopes':
      'gist, read:discussion, read:enterprise, read:gpg_key, read:org, read:public_key, read:repo_hook, read:user, repo',
    'x-runtime-rack': '0.036800',
    'x-xss-protection': '1; mode=block',
  },
  data: {
    name: 'package.json',
    path: 'package.json',
    sha: 'e06c5fe778fc557e877f15467fbc081dd869faee',
    size: 1332,
    url:
      'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/contents/package.json?ref=master',
    html_url:
      'https://github.qiwi.com/jslab/qorsproxy/blob/master/package.json',
    git_url:
      'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/git/blobs/e06c5fe778fc557e877f15467fbc081dd869faee',
    download_url:
      'https://github.qiwi.com/raw/jslab/qorsproxy/master/package.json?token=AAAAC5PEIAT6YAV35TCVBTK7LLPLI',
    type: 'file',
    content:
      'ewogICJuYW1lIjogInFvcnNwcm94eSIsCiAgImRlc2NyaXB0aW9uIjogIkNv\ncnMgcHJveHkgZm9yIFFvZGVyL1B1c2hlciIsCiAgImtleXdvcmRzIjogWwog\nICAgImNvcnMiLAogICAgImNvcnNwcm94eSIsCiAgICAicW9ycyIsCiAgICAi\ncW9yc3Byb3h5IgogIF0sCiAgInZlcnNpb24iOiAiMy4wLjIiLAogICJyZXBv\nc2l0b3J5IjogewogICAgInR5cGUiOiAiZ2l0IiwKICAgICJ1cmwiOiAiaHR0\ncHM6Ly9naXRodWIuY29tL3Fpd2kvcW9yc3Byb3h5IgogIH0sCiAgImF1dGhv\nciI6ICJBbnRvbiBHb2x1YiA8YS5nb2x1YkBxaXdpLmNvbT4iLAogICJlbmdp\nbmVzIjogewogICAgIm5vZGUiOiAiPj05LjQuMCA8MTAuMCIsCiAgICAibnBt\nIjogIj49NS42IDw2LjAiCiAgfSwKICAiZGVwZW5kZW5jaWVzIjogewogICAg\nIkBzdGQvZXNtIjogIl4wLjI2LjAiLAogICAgImFzeW5jLW1pZGRsZXdhcmUi\nOiAiXjEuMi4xIiwKICAgICJiYXNpYy1hdXRoIjogIl4yLjAuMCIsCiAgICAi\nZXhwcmVzcyI6ICJeNC4xNi4zIiwKICAgICJpcCI6ICJeMS4xLjUiLAogICAg\nImpzb25zY2hlbWEiOiAiXjEuMi40IiwKICAgICJsb2Rhc2gtZXMiOiAiXjQu\nMTcuOCIsCiAgICAib3B0aW1pc3QiOiAiXjAuNi4xIiwKICAgICJyZXF1ZXN0\nIjogIl4yLjg1LjAiLAogICAgIndpbnN0b24iOiAiXjIuNC4xIiwKICAgICJ3\naW5zdG9uLWRhaWx5LXJvdGF0ZS1maWxlIjogIl4zLjEuMiIKICB9LAogICJA\nc3RkL2VzbSI6IHsKICAgICJtb2RlIjogImFsbCIsCiAgICAiY2pzIjogdHJ1\nZQogIH0sCiAgIm1haW4iOiAic3JjL2FwcCIsCiAgInNjcmlwdHMiOiB7CiAg\nICAic3RhcnRfcG0yIjogInBtMiBzdGFydCBucG0gLS1uYW1lIHFvcnNwcm94\neSAtLSBzdGFydCIsCiAgICAic3RhcnQiOiAibm9kZSAtciBAc3RkL2VzbSAt\nLXVzZV9zdHJpY3Qgc3JjL2FwcCIsCiAgICAidGVzdCI6ICJueWMgbW9jaGEg\nLS1vcHRzIC5tb2NoYS5vcHRzIiwKICAgICJjb3ZlcmFsbHMiOiAibnBtIHRl\nc3QgJiYgbnljIHJlcG9ydCAtLXJlcG9ydGVyPXRleHQtbGNvdiB8IGNvdmVy\nYWxscyIKICB9LAogICJsaWNlbnNlIjogIk1JVCIsCiAgImRldkRlcGVuZGVu\nY2llcyI6IHsKICAgICJjaGFpIjogIl40LjEuMiIsCiAgICAiY2hhaS1zcGll\ncyI6ICJeMS4wLjAiLAogICAgImNoYWktc3Vic2V0IjogIl4xLjYuMCIsCiAg\nICAiY292ZXJhbGxzIjogIl4zLjAuMCIsCiAgICAiZ2xvYiI6ICJeNy4xLjIi\nLAogICAgIm1vY2hhIjogIl41LjEuMSIsCiAgICAibW9jaGEtbGNvdi1yZXBv\ncnRlciI6ICJeMS4zLjAiLAogICAgIm55YyI6ICJeMTEuNy4xIiwKICAgICJy\nZXFyZXNuZXh0IjogIl4xLjMuMCIKICB9Cn0K\n',
    encoding: 'base64',
    _links: {
      self:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/contents/package.json?ref=master',
      git:
        'https://github.qiwi.com/api/v3/repos/jslab/qorsproxy/git/blobs/e06c5fe778fc557e877f15467fbc081dd869faee',
      html: 'https://github.qiwi.com/jslab/qorsproxy/blob/master/package.json',
    },
  },
}
