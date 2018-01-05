const abi = require('human-standard-token-abi')
const Eth = require('ethjs-query')
const EthContract = require('ethjs-contract')

const tokenInfoGetter = function () {
  console.log('helloconsole - a')
  if (typeof global.ethereumProvider === 'undefined') return

  console.log('helloconsole - b')
  const eth = new Eth(global.ethereumProvider)
  console.log('helloconsole - c')
  const contract = new EthContract(eth)
  console.log('helloconsole - d')
  const TokenContract = contract(abi)

  console.log('helloconsole - e')
  const tokens = {}

  console.log('helloconsole - f')
  return async (address) => {
    console.log('helloconsole - g')
    if (tokens[address]) {
      return tokens[address]
    }

    console.log('helloconsole - h')
    const contract = TokenContract.at(address)

    console.log('helloconsole - i')
    const result = await Promise.all([
      contract.symbol(),
      contract.decimals(),
    ])

    console.log('helloconsole - j')
    const [ symbol = [], decimals = [] ] = result

    console.log('helloconsole - k')
    tokens[address] = { symbol: symbol[0], decimals: decimals[0] }

    console.log('helloconsole - l')
    return tokens[address]
  }
}

function calcTokenAmount (value, decimals) {
  const multiplier = Math.pow(10, Number(decimals || 0))
  const amount = Number(value / multiplier)

  return amount
}


module.exports = {
  tokenInfoGetter,
  calcTokenAmount,
}
