import {
    IonCol,
    IonContent,
    IonFab,
    IonFabButton, IonGrid,
    IonHeader,
    IonIcon,
    IonPage, IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Home.css';
import {add} from "ionicons/icons";
import {useEffect, useState} from "react";
import {Expense, getExpenses} from "../data/Storage";

const Home: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);

    useEffect(() => {
        const fetchExpenses = async () => {
            const expenses = await getExpenses();
            setExpenses(expenses);
        };
        fetchExpenses();
    }, [location.pathname]
    );
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Expenses - App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonGrid>
              <IonRow className="ion-text-bold ion-text-center ion-padding-vertical">
                  <IonCol size="3">Title</IonCol>
                  <IonCol size="3">Amount</IonCol>
                  <IonCol size="3">Category</IonCol>
                  <IonCol size="3">Date</IonCol>
              </IonRow>
              {expenses.map((expense) => (
                  <IonRow key={expense.id} className="ion-text-center ion-padding-vertical">
                      <IonCol size="3">{expense.title}</IonCol>
                      <IonCol size="3">{expense.amount}</IonCol>
                      <IonCol size="3">{expense.category}</IonCol>
                      <IonCol size="3">{expense.dateISO}</IonCol>
                  </IonRow>
              ))}
          </IonGrid>

          <IonFab slot="fixed" vertical="bottom" horizontal="end">
              <IonFabButton aria-label="Add" routerLink="/add">
                  <IonIcon icon={add} />
              </IonFabButton>
          </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
