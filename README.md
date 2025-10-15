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
#### Adrián Esteban Martín: 
Index page, fixing minor grammatical errors.

#### My 5 most significant commits

| Commit Number | Commit                                                                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1             | [Start of index](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/3981005dd83df989aeef7cc0584a9ec2516aadb7)    |
| #2             | [Add "new item" button](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/5ae0e54213f71d92478b3ba3de0e0de118240342)      |
| #3             | [Translate comments](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/af349af48477913f89ec31daf720a9d8b9e115b8)             |
| #4             | [Correct gramatical errors](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/e1eab6080dd14ca020f06a7bb24583a71f2b4fa0)               |
| #5             | [Update README](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/326f4b1f039d72bc293109ebf588561d88d80fdb)                                                                         |

#### The 5 files I have modified the most

| File Number | File                                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1             | [index.html](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/index.html)    |
| #2             | [style.css](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/css/styles.css)      |
| #3             | [detail.html](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/detail.html)             |
| #4             | [form.html](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/form.html)               |
| #5             | [README.md](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/README.md) 
----
#### Sergio González Gútiez: 
Detail page, unified button styles and colors, make the principal grid responsive, improved navigation bar (including responsive menu).

#### My 5 most significant commits

| Commit Number | Commit                                                                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1             | [Detail page finished](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/c8864629281cb1dd6fd722e14c8dccb0e78d2208) |
| #2             | [Navigation bar, beginning of detail page, button updates.](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/18a1f6384bfda8439b14cad507b265c8e3486b1e) |
| #3             | [Styling changes, file creation, and grid made responsive.](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/b0c98fc8501788b93edc331efce6e964baa65c5e) |
| #4             | [Button with the nav bar for small screens](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/af487217683cfd611092dd07f6e50660d9ff6218) |
| #5             | [Add user and date forms for a review in detail page](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/f1e8b018d92f83d2a9f0cdcbae9f7df8357b7999) |

#### The 5 files I have modified the most

| File Number | File                                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1             | [detail.html](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/detail.html)   |
| #2             | [index.html](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/index.html)       |
| #3             | [style.css](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/css/styles.css)          |
| #4             | [form.html](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/form.html)               |
| #5             | [README.md](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/README.md) 
----

💻 *Developed by Group 19 · FashionHub*
