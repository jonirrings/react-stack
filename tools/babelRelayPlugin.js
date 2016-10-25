/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const getbabelRelayPlugin = require('babel-relay-plugin');
const schema = require('../src/data/schema.json');

module.exports = getbabelRelayPlugin(schema.data);
