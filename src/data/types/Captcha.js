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
  GraphQLNonNull as NonNull,
} from 'graphql';

const CaptchaType = new ObjectType({
  name: 'Captcha',
  description: 'A Captcha is what verify the client whether is a human',
  fields: {
    id: {
      type: new NonNull(StringType),
      description: 'the id of a captcha which is used at BE to verify the true value',
    },
    base64: {
      type: new NonNull(StringType),
      description: 'the base64 image of a captcha',
    },
  },
});

export default CaptchaType;
