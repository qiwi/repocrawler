export const getBranchHead = { ref: 'HEAD', revision: 'master' }
export const getBranchMaster = {
  web_links: [
    {
      name: 'gitweb',
      url:
        '/gitweb?p=jslab%2Frepocrawler.git;a=shortlog;h=refs%2Fheads%2Fmaster',
    },
    {
      name: 'browse',
      url: '/plugins/gitiles/jslab/repocrawler/+/refs/heads/master',
      target: '_blank',
    },
  ],
  ref: 'refs/heads/master',
  revision: '13da9cfb3fbe46b0e9565307f829ffaf16ecb79b',
}
