import {Preferences} from "@capacitor/preferences";

const STORAGE_KEY = 'expenses:v1';

export type Expense = {
    id: string,
    title: string,
    amount: number,
    dateISO: string,
    createdAt: number,
    category: string
};

export async function saveExpenses(items: Expense[]): Promise<void> {
    await Preferences.set({
        key: STORAGE_KEY,
        value: JSON.stringify(items)
    })
}

export async function getExpenses(): Promise<Expense[]> {
    const {value} = await Preferences.get({key: STORAGE_KEY});
    return value ? JSON.parse(value) : [];
}