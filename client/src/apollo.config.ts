module.exports = {
  client: {
    service: {
      name: 'server',
      url: 'http://server:3333/graphql',
      headers: {
        authorization: 'supersecretspicysauce'
      },
      skipSSLValidation: true,
    },
  },
};
export{}