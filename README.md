# PC3R : Programmation concurrente, réactive, répartie, réticulaire 
## Contributions  : 

-   Yanis Tabellout : 21307532
-   Salim Tabellout : 21307533
## Description
Il s'agit du projet PC3R délivré pour Les étudiants du Master 1 STL. Un siteweb de rencontre pour les gens qui prennent la même ligne de la SNCF. On trouve plusieurs type de chat, notamment **les trips chat** de la même ligne, les chats personnels mais aussi les chats de regroupe. 


# Structure de fichiers 
```
main
├───backend
│
├───design
│
└───frontend
```

-   **backend** : contient toutes la logique du serveur, il est structuré en architecture **MVC**. Nous avons utilisé certains package notamment : 
    -   **ORM Prisma** : Pour la base de données PostgreSql
    -   **JWT** : Pour l'authentification
-   **design** : Contient notre design système à une échelle minimaliste
-   **Frontend** :Nous avons utilisé le framework de react **NextJs** avec pas mal d'autres librairies notamment : 
    -   **TypeScript** : pourquoi pas ? :) 
    -   **ShadcnUI/TailWindCss** : UI/UX
    -   **ReactQuery** : un Wrapper utilisé pour cahcer les réponses et gérer les API calls 
    -   **Gsap** : Librairie pour les animations
# Déploiement 
Nous avons déployé le site sur [Railway](https://pc3r-production-fba8.up.railway.app)
# Setup : 
Si vous aimez mettre la main dans la pâte alors 
## Environnement 
On vous a laissé un exemple à quoi peut ressembler un fichier **.env** pour le backend et le frontend, le setup de la base de donnée à vous de le faire pour postgres (vous pouvez utiliser supabase par exemple). 
### Remarque importante 
Dans l'env de frontend ne mettez pas de **https:// ou http://** dans l'URL du serveur car nous utilisons deux protocoles différents pour la connexion vers le serveur (ws et http).
## Shell 
Dans un shell 
```bash
./setup.sh 
``` 


# Lancement :

Lancez les deux script **run-client.sh** et **run-server.sh** dans des terminaux différents.