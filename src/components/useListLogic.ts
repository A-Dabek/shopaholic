
import { db } from "../firestore";
import { computed } from '@vue/composition-api';
import { countBy } from "lodash-es";

export interface ListData {
    id: string;
    items: string[];
    title: string;
}

export function useListLogic(props: { data: ListData }) {
    function removeList() {
        db.collection("planner")
            .doc(props.data.id)
            .delete();
    }
    function addToList(item: string) {
        db.collection("planner")
            .doc(props.data.id)
            .update({
                items: [...props.data.items, item]
            });
    }
    function removeFromList(item: string) {
        const foundIndex = props.data.items.findIndex(el => el === item);
        db.collection("planner")
            .doc(props.data.id)
            .update({
                items: props.data.items.filter((_, index) => index !== foundIndex)
            });
    }
    function resetList() {
        db.collection("planner")
            .doc(props.data.id)
            .update({
                items: []
            });
    }
    const itemCount = computed(() => countBy(props.data.items));
    const distinctItems = computed(() => Object.keys(itemCount.value).sort());
    return {
        itemCount,
        distinctItems,
        addToList,
        removeFromList,
        removeList,
        resetList
    };
}