export default class Client {

  post(path, args) {
    if (path === '/signin') {
      return new Promise((resolve, reject) => {
        process.nextTick(() => {
          if (args.username === 'AzureDiamond' && args.password === 'hunter2') {
            resolve('authenticated');
          } else {
            reject('failure');
          }
        });
      });
    }
  }

}
