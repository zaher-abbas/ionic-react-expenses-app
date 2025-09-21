import {
    IonButton, IonButtons,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton, IonFooter, IonGrid,
    IonHeader,
    IonIcon, IonModal,
    IonPage, IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Home.css';
import {add, arrowDown, arrowUp, logoLinkedin, moon, remove, sunny} from "ionicons/icons";
import {useEffect, useState} from "react";
import {Expense, getExpenses, saveExpenses} from "../data/Storage";
import {DarkMode} from "../hooks/useDarkMode";
import AppFooter from "../components/App-Footer";



const Home: React.FC = () => {
     const {isDark, toggleDarkMode} = DarkMode();
     const [expenses, setExpenses] = useState<Expense[]>([]);
     const [total, setTotal] = useState<number>(0);
     const [sortedCatAscendent, setCatSortedAscendent] = useState<boolean>(false);
     const [sortedTitleAscendent, setSortedTitleAscendant] = useState<boolean>(false);
     const [expensesIndex, setExpensesIndex] = useState<number>(0);
     const [confirmOpen, setConfirmOpen] = useState(false);

    function calculateTotal(expenses: Expense[]) {
        let totalAmount: number = 0;
        expenses.forEach(expense => {
            const expenseAmount: number = parseFloat(expense.amount.toString());
            totalAmount += expenseAmount;
        })
        setTotal(totalAmount);

    }

    useEffect(() => {
        const fetchExpenses = async () => {
            const expenses = await getExpenses();
            setExpenses(expenses);
            calculateTotal(expenses);
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

    function sortByTitle() {
        setSortedTitleAscendant(!sortedTitleAscendent);
        if (sortedTitleAscendent) {
            return expenses.sort((a, b) => b.title.localeCompare(a.title));
        }
        else
            setExpenses(prev => [...expenses].sort((a, b) => a.title.localeCompare(b.title)));
    }

    async function deleteExpense() {
        const newExpenses = [...expenses];
        newExpenses.splice(expensesIndex, 1);
        setExpenses(newExpenses);
        await saveExpenses(newExpenses);
        calculateTotal(newExpenses);
        setConfirmOpen(false);

    }

    function cancelDelete() {
        setConfirmOpen(false);
        setConfirmOpen(false);
    }

    function formatEuro(n: number) {
        return new Intl.NumberFormat('fr-FR', {style: 'currency', currency: 'EUR'}).format(n);
    }

    return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle><IonIcon></IonIcon>💸 Expenses - App</IonTitle>
          <IonButtons slot="end">
              <IonButton
                  onClick={toggleDarkMode}
                  aria-label={isDark ? 'Deactivate Dark Mode' : 'Activate Dark Mode'}
              >
                  <IonIcon slot="icon-only" icon={isDark ? sunny : moon} />
              </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
          <IonGrid>
              <IonRow className="ion-justify-content-center">
                  <IonCol sizeSm="12" sizeMd="10" sizeLg="8" sizeXl="6">
                      <IonCard className="ion-margin-top ion-text-center">
                          <IonCardHeader>
                              <IonCardTitle>💰 Total Expenses</IonCardTitle>
                          </IonCardHeader>
                          <IonCardContent style={{fontWeight: 700, fontSize: '2rem'}}>
                              {formatEuro(total)}
                          </IonCardContent>
                      </IonCard>
                  </IonCol>
              </IonRow>
          </IonGrid>
          <IonGrid>
              <IonRow className="ion-text-bold ion-text-center ion-padding-vertical">
                  <IonCol>
                  </IonCol>
                  <IonCol className="header-with-icon">
                      <span>Title</span>
                      <IonButton
                          fill="clear"
                          size="small"
                          aria-label="Sort by Title"
                          onClick={sortByTitle}
                      >
                          <IonIcon icon={sortedTitleAscendent ? arrowDown : arrowUp}/>
                      </IonButton>
                  </IonCol>
                  <IonCol >Amount</IonCol>
                  <IonCol  className="header-with-icon">
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
                  <IonCol>Date</IonCol>
              </IonRow>
              {expenses.map((expense) => (
                  <IonRow key={expense.id} className="ion-text-center ion-padding-vertical">
                      <IonCol >
                           <IonButton
                          color="danger"
                          size="small"
                          aria-label="Delete Expense"
                          onClick={() => {
                              setExpensesIndex(expenses.indexOf(expense))
                              setConfirmOpen(true)
                          }}
                      ><IonIcon icon={remove}></IonIcon>
                           </IonButton>
                      </IonCol>
                      <IonCol >{expense.title}</IonCol>
                      <IonCol >{formatEuro(expense.amount)}</IonCol>
                      <IonCol >{expense.category}</IonCol>
                      <IonCol >{expense.dateISO}</IonCol>
                  </IonRow>
              ))}
          </IonGrid>
          <IonFab slot="fixed" vertical="bottom" horizontal="center">
              <IonFabButton aria-label="Add" routerLink="/add">
                  <IonIcon icon={add} />
              </IonFabButton>
          </IonFab>
      </IonContent>
        <AppFooter></AppFooter>
        <IonModal isOpen={confirmOpen} onDidDismiss={cancelDelete}>
            <div style={{ padding: 16 }}>
                <h2>Delete this expense?</h2>
                <p>This action cannot be undone!</p>
                <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <IonButton onClick={cancelDelete} color="medium">Cancel</IonButton>
                    <IonButton onClick={deleteExpense} color="danger">Delete</IonButton>
                </div>
            </div>
        </IonModal>

    </IonPage>

  );
};

export default Home;
