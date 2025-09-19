import {
    IonButton, IonButtons,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle,
    IonCol,
    IonContent,
    IonFab,
    IonFabButton, IonFooter, IonGrid,
    IonHeader,
    IonIcon,
    IonPage, IonRow,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import './Home.css';
import {add, arrowDown, arrowUp, logoLinkedin, moon, sunny} from "ionicons/icons";
import {useEffect, useState} from "react";
import {Expense, getExpenses} from "../data/Storage";
import {DarkMode} from "../hooks/useDarkMode";

const Home: React.FC = () => {
     const {isDark, toggleDarkMode} = DarkMode();
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

    function sortByTitle() {
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
          <IonTitle><IonIcon></IonIcon>💸 Expenses - App</IonTitle>
          <IonButtons slot="end">
              <IonButton
                  onClick={toggleDarkMode}
                  aria-label={isDark ? 'Désactiver le mode sombre' : 'Activer le mode sombre'}
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
                          <IonCardContent>
                              {total}
                          </IonCardContent>
                      </IonCard>
                  </IonCol>
              </IonRow>
          </IonGrid>
          <IonGrid>
              <IonRow className="ion-text-bold ion-text-center ion-padding-vertical">
                  <IonCol size="3" className="header-with-icon">
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
        <IonFooter>
            <IonToolbar className="ion-text-center">
                <IonTitle size="small">
                    © {new Date().getFullYear()} Developed by Zaher ABBAS &nbsp; &nbsp;
                    <a
                        href="https://www.linkedin.com/in/z83/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                        aria-label="LinkedIn profile"
                    >
                        <IonIcon icon={logoLinkedin} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                        LinkedIn
                    </a>
                </IonTitle>
            </IonToolbar>
        </IonFooter>
    </IonPage>
  );
};

export default Home;
