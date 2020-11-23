import { StorageService } from '@/storage-service';
import { computed, ref, watchEffect } from '@vue/composition-api';
import { Alley } from './alley';

export function useAlleyLogic(props: { shop: string; alley: string }) {
  const alleyProducts = ref<string[]>([]);
  const products = ref<string[]>([]);
  const reservedProducts = ref<string[]>([]);

  StorageService.collections
    .alleys(props.shop)
    .get()
    .then(snapshot => {
      snapshot.docs.forEach(doc => {
        if (doc.id === props.alley) return;
        const data = doc.data() as Alley;
        reservedProducts.value = [...reservedProducts.value, ...data.items];
      });
    });

  watchEffect(() => {
    return StorageService.collections.product.onSnapshot(snapshot => {
      products.value = snapshot.docs.map(doc => doc.id).sort();
    });
  });
  watchEffect(() => {
    return StorageService.collections
      .alley(props.shop, props.alley)
      .onSnapshot(snapshot => {
        alleyProducts.value = (snapshot.data() as Alley).items;
      });
  });
  const availableProducts = computed(() => {
    return products.value.filter(
      p =>
        !alleyProducts.value.find(ap => ap === p) &&
        !reservedProducts.value.find(rp => rp === p)
    );
  });

  const addToAlley = (name: string) => {
    StorageService.collections
      .alley(props.shop, props.alley)
      .update({ items: [...alleyProducts.value, name] });
  };

  const removeFromAlley = (name: string) => {
    StorageService.collections
      .alley(props.shop, props.alley)
      .update({ items: alleyProducts.value.filter(p => p !== name) });
  };

  const removeProduct = (name: string) => {
    StorageService.collections.product.doc(name).delete();
  };

  return {
    alleyProducts,
    availableProducts,
    addToAlley,
    removeFromAlley,
    removeProduct,
  };
}
