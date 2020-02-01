
import {
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import * as Icons from 'ionicons/icons';
import React from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

const appPages = [
  {
    title: 'Greteli fröge',
    url: '/classify',
    icon: Icons.home
  },
  {
    title: 'feldbuech',
    url: '/fieldbook',
    icon: Icons.book
  },
  {
    title: 'iistellige',
    url: '/settings',
    icon: Icons.settings
  }
]


class Menu extends React.Component {
  render() {
    return (
      <IonMenu contentId="main" type="reveal">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            {appPages.map((appPage, index) => {
              return (
                <IonMenuToggle key={index} autoHide={false}>
                  <IonItem routerLink={appPage.url} routerDirection="none" >
                    <IonLabel>{appPage.title}</IonLabel>
                  </IonItem>
                </IonMenuToggle>
              );
            })}
          </IonList>
        </IonContent>
      </IonMenu>
    );
  }
}

export default withRouter(Menu);
