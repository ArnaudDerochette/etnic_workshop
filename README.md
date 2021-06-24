# ETNIC Workshop A11Y

Cette branche sert de correctif à l'exercice.

## 1.Analyse

Une breve analyse qui permet de voir que les points suivants ne sont pas accessibles.

- Le focus n'est pas visible.
- les contrastes de couleurs ne sont pas assez élevés
- la hiérarchie des titres n'est pas cohérente
- landmarks pas suffisants
- Les noms ne sont pas remplis pour certains liens/images/...
- La partie 'OUR CLASSES' n'est pas formattée sous forme d'onglets
- La partie 'EXPERT TRAINERS' contient des fenêtres modales.
  - Ces fenêtres doivent pouvoir boucler le focus, c'est à dire que lorsqu'on est sur le dernier élément de la modale et qu'on tabule pour passer au suivant, le focus doit revenir au premier et non pas sortir de la modale.
  - Un utilisateur de clavier dois pouvoir quitter facilement la modale, en général avec la touche ECHAP
  - La taille des icones est trop petite pour des utilisateurs avec des problèmes de vue.
  - Lorsqu'on zoom, on perd la possibilité de scroller dans la modale.
  - Le reste du DOM ne dois pas être navigable (ni scrollable) quand la modale est active
