# GRUPO 19 · Fundamentos de la Web
## Proyecto: Tienda Online de Ropa

Este repositorio contiene el desarrollo de una aplicación web que simula una tienda online de ropa.  
La aplicación permite gestionar prendas de ropa (con imágenes asociadas) y reseñas de usuarios, además de ofrecer buscador, filtrado y categorización por tipo de prenda.

## Nombre
FashionHub


## Equipo de desarrollo
- **Sergio González Gútiez** · s.gonzalezg.2023@alumnos.urjc.es · [GitHub](https://github.com/sergiomadrz)  
- **Alejandro Martín Carrera** · mailto:a.martinca.2021@alumnos.urjc.es · [GitHub](https://github.com/alejandromartincarrera)  
- **Adrián Esteban Martín** · a.estebanm.2021@alumnos.urjc.es · [GitHub](https://github.com/aadri-2003)  


## Funcionalidad

###  Entidad principal: **Prenda de ropa**
Consideramos que nuestro concepto principal que guarde la base de datos sea una *Prenda de ropa*. Esta entidad tendrá los siguientes atributos:

| Atributo    | Ejemplo                  |
|-------------|--------------------------|
| Nombre      | Camiseta básica blanca   |
| Descripción | Manga corta, unisex      |
| Tipo        | Camiseta, Sudadera, etc. |
| Talla       | XS, S, M, L, XL, XXL     |
| Tejido      | Algodón                  |
| Color       | Negro                    |
| Precio      | 19.99 €                  |
| Imágenes    |             |


### Entidad secundaria: **Reseña**
Cada reseña está asociada a una prenda concreta y una prenda puede tener varias reseñas. Los atributos que consideraremos son:  

| Atributo   | Ejemplo                         |
|------------|---------------------------------|
| Autor      | @juan23                         |
| Texto      | "La camiseta tiene buena calidad" |
| Puntuación | 4/5 estrellas                   |
| Fecha      | 2025-03-02                      |
| Imagen????     |                                 |


### Imágenes
Cada prenda tendrá al menos una imagen asociada, que se podrá subir desde el navegador.  
Ejemplo de imagen incluida en el repositorio:  

![Ejemplo de camiseta](./images/camiseta_ejemplo.jpg)


### Buscador, filtrado y categorización
- **Buscador**: cuadro de texto que busca prendas por nombre o descripción.  
- **Filtrado**: por talla, color, precio o material.  
- **Categorización**: por tipo de prenda (camiseta, sudadera, pantalón, zapatillas...).  

