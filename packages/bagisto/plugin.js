import { apiClient } from '@/packages/bagisto/api-client/src/index';
import { useProduct } from '@/packages/bagisto/composables/src/useProduct/index';

export default (context, inject) => {
  inject('bagisto', {
    api: apiClient,
    useProduct
  });
};
