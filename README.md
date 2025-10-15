# 👕 GROUP 19 · Fundamentos de la web  
## 🛍️ Project: Online Clothing Store  

This repository contains the development of a web application that simulates an online clothing store.  
The application allows managing clothing items (with associated images) and user reviews, as well as providing search, filtering, and categorization by type of garment.


## 👨‍💻 Development Team  
- **Sergio González Gútiez** · s.gonzalezg.2023@alumnos.urjc.es · [GitHub](https://github.com/sergiomadrz)  
- **Alejandro Martín Carrera** · a.martinca.2021@alumnos.urjc.es · [GitHub](https://github.com/alejandromartincarrera)  
- **Adrián Esteban Martín** · a.estebanm.2021@alumnos.urjc.es · [GitHub](https://github.com/aadri-2003)
- **Laura Pineda Ballesteros** . l.pineda.2022@alumnos.urjc.es . [GitHub](https://github.com/lauraxpb)



## ⚙️ Functionality  

### 👕**Clothing items**  
We consider our main concept to be stored in the database as a *Clothing item*. This entity will have the following attributes:

| Attribute   | Example                        |
|------------|--------------------------------|
| Name       | Basic white t-shirt            |
| Description| Short sleeve, unisex           |
| Type       | T-shirt, Sweatshirt, Jeans, Sneakers, Socks, Hats     |
| Size       | XS, S, M, L, XL, XXL           |
| Fabric     | Cotton                         |
| Color      | Black                          |
| Price      | €19.99                         |
| Images     |                                |



### ⭐ **Reviews**  
Each review is associated with a specific clothing item, and a clothing item can have multiple reviews. The attributes we will consider are:  

| Attribute | Example                             |
|-----------|-------------------------------------|
| Author    | @juan23                             |
| Text      | "The t-shirt has good quality"      |
| Rating    | 4/5 stars                           |
| Date      | 2025-03-02                          |



## 🔍 Search, Filtering, and Categorization  
- **Search**: text box that searches items by name or description.  
- **Categorization**: by type of garment (T-shirt, Sweatshirt, Jeans, Sneakers, Socks, Hats).



## 🖼️ Screens    

### Home Screen:
On this screen, we display all our products, the search engines, and the button to add a new item of clothing.

<img width="1588" height="2201" alt="index html" src="https://github.com/user-attachments/assets/b22751a5-6c65-417d-b33b-5032234b37c0" />

### Detail Screen:
On this page, we display information about a product, with the option to edit it. We also show reviews that people have written about our products and allow them to add new reviews.

<img width="1588" height="2560" alt="detail html" src="https://github.com/user-attachments/assets/9497ce8e-2cd0-48f8-8f4d-ba52a32d5c09" />

### Form Screen: 
Our website has a page for adding items. To do so, users must fill in the form on the screen.

<img width="1588" height="1404" alt="form html" src="https://github.com/user-attachments/assets/f5bec0fc-70a5-446d-8c30-b53dbb97c896" />



### 👩‍🎨 Individual Contributions  
- **Laura Pineda Ballesteros**: Search functionality, fixing positioning issues, styling adjustments.
- **Alejandro Martín Carrera**: Form page, fixing images bug.

----

💻 *Developed by Group 19 · FashionHub*
