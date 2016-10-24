/**
 * react-stack react-stack
 *
 * Copyright © 2016. JonirRings.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {
  GraphQLNonNull as NonNull,
  GraphQLID as IDType,
} from 'graphql';
import {
  mutationWithClientMutationId,
} from 'graphql-relay';
import { CaptchaType } from '../../types';
import { addCaptcha } from '../../models';

const mutation = mutationWithClientMutationId({
  name: 'AddCaptcha',
  inputFields: {
    userId: { type: new NonNull(IDType) },
  },
  outputFields: {
    userEdge: {
      type: CaptchaType,
      resolve: captcha => captcha,
    },
  },
  mutateAndGetPayload: ({ userId }) => addCaptcha({ userId }),
});

export default mutation;
