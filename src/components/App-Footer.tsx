import React from "react";
import {IonFooter, IonIcon, IonTitle, IonToolbar} from "@ionic/react";
import {logoGithub, logoLinkedin} from "ionicons/icons";

const AppFooter: React.FC = () => {
    return (
        <IonFooter>
            <IonToolbar className="ion-text-center">
                <IonTitle size="small">
                    © {new Date().getFullYear()} Developed by Zaher ABBAS &nbsp;
                    <a
                        href="https://www.linkedin.com/in/z83/"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                        aria-label="LinkedIn profile"
                        className="ion-padding-horizontal"
                    >
                        <IonIcon icon={logoLinkedin} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                    </a>
                    <a
                        href="https://github.com/zaher-abbas"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none' }}
                        aria-label="LinkedIn profile"
                    >
                        <IonIcon icon={logoGithub} style={{ verticalAlign: 'middle', marginRight: 6 }} />
                    </a>
                </IonTitle>
            </IonToolbar>
        </IonFooter>
    )
}

export default AppFooter