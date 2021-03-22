interface ChainProvider {
  // property key used for referencing chain types from a list
  networkAlias: string;
  displayName: string;
  info?: string;
  endpoint: string;
}

export const localNode: ChainProvider = {
  networkAlias: 'local-node',
  displayName: 'Local Node',
  endpoint: 'ws://127.0.0.1:9944',
};

export const providerEndpoints: ChainProvider[] = [
  {
    networkAlias: 'plasm-main',
    displayName: 'Plasm Network',
    info: 'The main network of the layer 2 scaling blockchain, Plasm Network',
    endpoint: 'wss://rpc.plasmnet.io/',
  },
  {
    networkAlias: 'dusty-testnet',
    displayName: 'Dusty Plasm Network',
    info:
      'The test network of the layer 2 scaling blockchain, Dusty Plasm Network',
    endpoint: 'wss://rpc.dusty.plasmnet.io/',
  },
  localNode,
];
