/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  GraphQLObjectType as ObjectType,
  GraphQLString as StringType,
  GraphQLID as IDType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import { connectionDefinitions } from 'graphql-relay';
import { nodeInterface } from './Interface';

const CaptchaType = new ObjectType({
  name: 'Captcha',
  description: 'A Captcha is what verify the client whether is a human',
  fields: {
    id: {
      type: new NonNull(IDType),
      description: 'the id of a captcha which is used at BE to verify the true value',
    },
    base64: {
      type: new NonNull(StringType),
      description: 'the base64 image of a captcha',
    },
  },
  interfaces: [nodeInterface],
});
const {
  connectionType: CaptchaConnection,
  edgeType: CaptchaEdge,
} = connectionDefinitions({
  name: 'Captcha',
  nodeType: CaptchaType,
});
export { CaptchaConnection, CaptchaEdge };
export default CaptchaType;
