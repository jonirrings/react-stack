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
  GraphQLString as StringType,
  GraphQLID as IDType,
} from 'graphql';
import {
  mutationWithClientMutationId,
} from 'graphql-relay';
import { removeCaptcha } from '../../models';

const mutation = mutationWithClientMutationId({
  name: 'DeleteCaptcha',
  inputFields: {
    id: { type: new NonNull(IDType) },
    value: { type: new NonNull(StringType) },
  },
  outputFields: {
    captcha: {
      type: IDType,
      resolve: ({ id }) => id,
    },
  },
  mutateAndGetPayload: ({ id, value }) => removeCaptcha({ id, value }),
});

export default mutation;
