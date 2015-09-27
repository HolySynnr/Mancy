import _ from 'lodash';
import ReplConsoleHook from '../common/ReplConsoleHook';
import vm from 'vm';

let createContext = () => {
  // sandbox
  let context = vm.createContext();
  let defaults = [ 'DTRACE_NET_SERVER_CONNECTION',
    'DTRACE_NET_STREAM_END',
    'DTRACE_HTTP_SERVER_REQUEST',
    'DTRACE_HTTP_SERVER_RESPONSE',
    'DTRACE_HTTP_CLIENT_REQUEST',
    'DTRACE_HTTP_CLIENT_RESPONSE',
    'process',
    'Buffer',
    'clearImmediate',
    'clearInterval',
    'clearTimeout',
    'setImmediate',
    'setInterval',
    'setTimeout',
    'console',
    'module',
    'require'];

  let circulars = [ '_', 'global', 'GLOBAL', 'root'];

  _.each(defaults, (g) => {
    context[g] = global[g];
  });

  _.each(circulars, (g) => {
    context[g] = context;
  });

  _.each('error', 'warn', 'info', 'log', 'debug', (fun) => {
    context.console[fun] = ReplConsoleHook[fun];
  });

  return context;
};

export default { createContext: createContext };
