/*

!   After creating this server.ts file we need : 
?   pour l'instant on va juster essayer de dumper les data de notre db locale
 
?   -   lancer la commande : TA ONLY : 
todo        pg_dump -U <USER_NAME> --encoding utf8 --no-publications --no-security-labels --no-subscriptions -O --no-tablespaces --no-comments -a --column-inserts --attribute-inserts -d <TABLE_NAME> > db/data.sql 
?       normalement y'aura un fichier data.sql qui sera créer
?   -   remodifier l'URL de la Database dans l'env, pour utiliser celle de supabase et reacher le endpoint /db/seed : 
!   lancer le code de data.sql dans le terminal de supabase directement 
*/