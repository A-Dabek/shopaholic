import { db } from '../firestore';
import { defineComponent, reactive, ref } from '@vue/composition-api';

export function useProductSelectLogic(
  emit: (event: string, ...args: any[]) => void
) {
  const productOptions = reactive([]);
  function onChange(event: Event) {
    emit('select', (event.target as HTMLSelectElement).value);
  }

  const productName = ref('');
  function onProductSubmit() {
    db.collection('products')
      .doc(productName.value)
      .set({})
      .then(() => {
        emit('select', productName.value);
        productName.value = '';
      });
  }

  return {
    productName,
    onProductSubmit,
  };
}
