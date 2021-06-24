# ETNIC Workshop A11Y

Cette branche sert de correctif à l'exercice.

## 1.Analyse

Une breve analyse qui permet de voir que les points suivants ne sont pas accessibles.

-   [x] Le menu
    -   [x] Ajouter un 'skip to content'
    -   [x] Le burger menu n'est pas focusable, on ne peut pas ouvrir le menu au clavier
    -   [x] Aria expanded sur le burger
-   [x] Le focus n'est pas visible.
-   [x] la hiérarchie des titres n'est pas cohérente
-   [x] landmarks pas suffisants
-   [x] La partie 'EXPERT TRAINERS' contient des fenêtres modales.
    -   [x] Ces fenêtres doivent pouvoir boucler le focus, c'est à dire que lorsqu'on est sur le dernier élément de la modale et qu'on tabule pour passer au suivant, le focus doit revenir au premier et non pas sortir de la modale.
    -   [x] Un utilisateur de clavier dois pouvoir quitter facilement la modale, en général avec la touche ECHAP
    -   [x] Lorsqu'on zoom, on perd la possibilité de scroller dans la modale.
    -   [x] Le reste du DOM ne dois pas être navigable (ni scrollable) quand la modale est active
-   [ ] Formulaire de contact
    -   [ ] Mettre des labels liés au inputs
    -   [ ] Mettre une phrase pour expliquer que les champs avec une astérisque sont obligatoires
-   [ ] les contrastes de couleurs ne sont pas assez élevés
-   [ ] Les noms ne sont pas remplis pour certains liens/images/...
-   [ ] La taille des icones est trop petite pour des utilisateurs avec des problèmes de vue.
