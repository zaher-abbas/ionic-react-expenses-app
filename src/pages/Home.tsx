import {
    IonButton,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
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
import {add, arrowDown, arrowUp} from "ionicons/icons";
import {useEffect, useState} from "react";
import {Expense, getExpenses} from "../data/Storage";

const Home: React.FC = () => {
     const [expenses, setExpenses] = useState<Expense[]>([]);
     const [total, setTotal] = useState<number>(0);
     const [sortedCatAscendent, setCatSortedAscendent] = useState<boolean>(false);
     const [sortedTitleAscendent, setSortedTitleAscendant] = useState<boolean>(false);

    useEffect(() => {
        const fetchExpenses = async () => {
            const expenses = await getExpenses();
            setExpenses(expenses);
            let totalAmount: number = 0;
            expenses.forEach(expense => {
                const expenseAmount: number = parseFloat(expense.amount.toString());
                totalAmount += expenseAmount;
            })
            setTotal(totalAmount);
        };
        fetchExpenses();
    }, [location.pathname]
    );

    function sortByCategory() {
        setCatSortedAscendent(!sortedCatAscendent);
        if (sortedCatAscendent) {
            return expenses.sort((a, b) => b.category.localeCompare(a.category));
        }
        else
        setExpenses(prev => [...expenses].sort((a, b) => a.category.localeCompare(b.category)));
    }

    function sortByName() {
        setSortedTitleAscendant(!sortedTitleAscendent);
        if (sortedTitleAscendent) {
            return expenses.sort((a, b) => b.title.localeCompare(a.title));
        }
        else
            setExpenses(prev => [...expenses].sort((a, b) => a.title.localeCompare(b.title)));
    }
    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Expenses - App</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonCard className="ion-margin-top ion-text-center">
          <IonCardHeader>
              <IonCardTitle>Total Expenses</IonCardTitle>
          </IonCardHeader>
              <IonCardContent>
                  {total}
              </IonCardContent>
          </IonCard>
          <IonGrid>
              <IonRow className="ion-text-bold ion-text-center ion-padding-vertical">
                  <IonCol size="3" className="header-with-icon">
                      <span>Title</span>
                      <IonButton
                          fill="clear"
                          size="small"
                          aria-label="Sort by Title"
                          onClick={sortByName}
                      >
                          <IonIcon icon={sortedTitleAscendent ? arrowDown : arrowUp}/>
                      </IonButton>
                  </IonCol>
                  <IonCol size="3">Amount</IonCol>
                  <IonCol size="3" className="header-with-icon">
                      <span>Category</span>
                      <IonButton
                          fill="clear"
                          size="small"
                          aria-label="Sort by category"
                          onClick={sortByCategory}
                      >
                          <IonIcon icon={sortedCatAscendent ? arrowDown : arrowUp} />
                      </IonButton>
                  </IonCol>
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
          <IonFab slot="fixed" vertical="bottom" horizontal="center">
              <IonFabButton aria-label="Add" routerLink="/add">
                  <IonIcon icon={add} />
              </IonFabButton>
          </IonFab>
      </IonContent>
    </IonPage>
  );
};

export default Home;
