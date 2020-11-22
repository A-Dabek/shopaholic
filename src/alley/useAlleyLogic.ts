import { StorageService } from '@/storage-service';
import { computed, ref, watchEffect } from '@vue/composition-api';
import { Alley } from './alley';

export function useAlleyLogic(props: { shop: string; alley: string }) {
  const alleyProducts = ref<string[]>([]);
  const products = ref<string[]>([]);

  StorageService.collections.product.get().then(collection => {
    products.value = collection.docs.map(doc => doc.id).sort();
  });
  const availableProducts = computed(() => {
    return products.value.filter(
      p => !alleyProducts.value.find(ap => ap === p)
    );
  });
  watchEffect(() => {
    return StorageService.collections
      .alley(props.shop, props.alley)
      .onSnapshot(snapshot => {
        alleyProducts.value = (snapshot.data() as Alley).items;
      });
  });

  return {
    alleyProducts,
    availableProducts,
  };
}
