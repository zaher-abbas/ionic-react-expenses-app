import {
    IonButton, IonCol,
    IonContent, IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList, IonNote,
    IonPage, IonRow, IonSelect, IonSelectOption,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React, { useState } from 'react';
import { Expense, getExpenses, saveExpenses } from '../data/Storage';
import {useHistory} from "react-router-dom";

const AddExpense: React.FC = () => {
    const history = useHistory();
    const CATEGORIES: string[] = ['Food', 'Transportation', 'Entertainment', 'Health', 'Education', 'Other'];
    const [title, setTitle] = useState<string>('');
    const [amount, setAmount] = useState<number>(0.1);
    const [dateISO, setDateISO] = useState<string>(new Date().toISOString().slice(0, 10));
    const [category, setCategory] = useState<string>('');
    const [error, setError] = useState<Boolean>(false);


    async function submit (e: React.FormEvent) {
        e.preventDefault();

        const addedExpense: Expense = {
            id: crypto.randomUUID(),
            title: title.trim(),
            amount: amount,
            dateISO: dateISO,                // e.g., "2025-09-18" (YYYY-MM-DD)
            createdAt: Date.now(),          // current timestamp
            category,
        };
        if (!category){
           setError(true);
            return;
        }
        const expenses = await getExpenses();
        const nexExpenses = [addedExpense, ...expenses];
        await saveExpenses(nexExpenses);
        history.push('/home');
        return;

    }

return (
    <IonPage>
        <IonHeader>
            <IonToolbar>
                <IonTitle>Add Expense</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
            <IonGrid fixed>
                <IonRow className="ion-justify-content-center">
                    <IonCol size="12" sizeMd="8" sizeLg="6" sizeXl="5">
                        <form onSubmit={submit}>
                            <IonList inset>
                                <IonItem>
                                    <IonLabel position="stacked">Title</IonLabel>
                                    <IonInput
                                        value={title}
                                        type="text"
                                        onIonChange={(e) => setTitle(e.detail.value || '')}
                                        required
                                        minlength={2}
                                        placeholder="e.g. Groceries"
                                    />
                                </IonItem>
                                <IonItem>
                                    <IonLabel position="stacked">Amount</IonLabel>
                                    <IonInput
                                        type="number"
                                        step="0.1"
                                        min="0.1"
                                        value={amount}
                                        onIonChange={(e) => setAmount(e.detail.value ? parseFloat(e.detail.value) : 0.01)}
                                        required
                                        placeholder="e.g. 25.50"
                                    />
                                </IonItem>
                                <IonItem>
                                    <IonSelect
                                        label="Category"
                                        labelPlacement="stacked"
                                        value={category}
                                        onIonChange={(e) => setCategory(e.detail.value)}
                                        required
                                        placeholder="Select a category"
                                        name="category"
                                    >
                                        {CATEGORIES.map((c) => (
                                            <IonSelectOption key={c} value={c}>
                                                {c}
                                            </IonSelectOption>
                                        ))}
                                    </IonSelect>
                                </IonItem>
                                {error && <IonNote color="danger" className="ion-margin-start">Please select a
                                    category!</IonNote>}
                                <IonItem>
                                    <IonLabel position="stacked">Date</IonLabel>
                                    <IonInput
                                        type="date"
                                        value={dateISO}
                                        onIonChange={(e) => setDateISO(e.detail.value || '')}
                                        required
                                        placeholder="e.g. 2025-09-18"
                                    />
                                </IonItem>
                            </IonList>
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="6">
                                        <IonButton color="success" expand="block" type="submit">
                                            Add
                                        </IonButton>
                                    </IonCol>
                                    <IonCol size="6">
                                        <IonButton color="danger" expand="block" type="button" onClick={() =>{
                                            setError(false);
                                            history.push('/home');}}>
                                            Cancel
                                        </IonButton>
                                    </IonCol>
                                </IonRow>

                            </IonGrid>
                        </form>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonContent>
    </IonPage>
)
}

export default AddExpense;
