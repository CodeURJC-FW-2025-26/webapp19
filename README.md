# 👕 GROUP 19 · Fundamentos de la web  
# Práctica 1
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



## 👩‍🎨 Individual Contributions  
- **Laura Pineda Ballesteros**: Search functionality, fixing positioning issues, styling adjustments.

#### My 5 most significant commits
| Commit Number | Commit                                                                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1             | [Search bar functionality](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/d4573498de0db82c9faa535bd4a48fa8b4d2fe8f) |
| #2             | [Same style for every product](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/82126a1e7b69837876044ec8c1a1990c5651f64f)
| #3             | [Default options](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/2b408dcd2a881042cd1dc48cd5601ea91641552b)|
| #4             | [Search bar skeleton](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/77efbb3721ec23dbadeb68fdc5fbdb5297a31288)|
| #5             | [Form modifications](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/0ff33b78b734a43ad406188e3edc1758e8c4a51c) |

#### The 5 files I have modified the most
| File Number | File                                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | 
| #1             | [index.html](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/index.html)                                                                                                                                                                               |
| #2             | [style.css](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/style.css)                                                                                                                                                                                   |
| #3             | [detail.html](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/detail.html)                                                                                                                                                                                   |
| #4             | [form.html](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/form.html)                                                                                                                                                                                   |
| #5             | [README.md](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/README.md)                                                                                                                                                                                |

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
#### Alejandro Martín Carrera:
Form page, fixing images bug.

#### My 5 most significant commits

| Commit Number | Commit                                                                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1             | [Form basic](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/f884c872d4d2330e356755fe5202182fc24f4d63) |
| #2             | [Form initiation](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/769eb143a4c0c5f9cfd98db715de9d6161d6fae4) |
| #3             | [Changes on form](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/c4c5b49eb5980ae0203eee75b82003909238cbd5)|
| #4             |  [Responsive buttons](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/60bd7986c0c65c69532984e0d86856fd8eef5f5b)|
| #5             | [Fix images urls](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/34637650a4bfb0722d5305c5cc865be89fca0282) |

#### The 5 files I have modified the most

| File Number | File                                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1             | [detail.html](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/detail.html)   |
| #2             | [index.html](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/index.html)       |
| #3             | [style.css](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/css/styles.css)          |
| #4             | [form.html](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/form.html)               |
| #5             | [README.md](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/README.md) 


# Práctica 2
## 🛠 Execution instructions
To run the application, you need the following minimun requeriments:
- **Node.js** (version 18.x or higher)
- **MongoDB** (version5.x or higher)

First, you must clone the repository, the default port will be 3000 and the default port for MongoDB will be 27017.

git clone https://github.com/CodeURJC-FW-2025-26/webapp19.git

cd webapp19

Then you must install the dependencies (npm install) and set up the project (npm start or npm run watch).

Finally, you have to open the URL in the browser: start http://localhost:3000/

## 📁 File description
- data
  - **images**: default product images.
  - **data.json**: JSON file initial data used to load the data base at startup.
- public
  - **styles.css**: CSS styles for the application.
  - **images**: public and static images.
- src
  - **app.js**: application entry point. Configures Express, the template engine (mustache-express), middelware and assembles the route. Listen on port 3000.
  - **clothing_shop.js**: data access layer. Connects to MongoDB, defines the main entity collection, and exports functions for CRUD and operations on the secondary entity.
  - **load_data.js**: loads the initial data into the database in case it is empty.
  - **router.js**: Defines the HTTP routes for the web application. Manages form validation, pagination, file uploads, and view rendering with the appropriate information.
- uploads
  - **images**: store uploaded images.
- views
  - **detail.html**: detailed view of a garment, showing complete information and reviews, form for adding/editing reviews.
  - **edit.html**: form to create/edit a garment.
  - **footer.html**: reusable fragments for footer
  - **header.html**: reusable fragments for header. 
  - **index.html**: main view showing the list of garments, a search engine and a filter
  - **message.html**: intermediate page to display confirmation or error messages

## 📹 Video

## 👩‍🎨 Individual Contributions  
- **Laura Pineda Ballesteros**: .

#### My 5 most significant commits
| Commit Number | Commit                                                                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1             |  |
| #2             |
| #3             | |
| #4             | |
| #5             |  |

#### The 5 files I have modified the most
| File Number | File                                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | 
| #1             |                                                                                                                                                                                |
| #2             |                                                                                                                                                                                    |
| #3             |                                                                                                                                                                                    |
| #4             |                                                                                                                                                                                    |
| #5             |                                                                                                                                                                                |

#### Adrián Esteban Martín: 
I have worked on implementing the new requirements for the home page.

#### My 5 most significant commits

| Commit Number | Commit                                                                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1             | [Delete unused images and minor adjustments](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/694572646e3376c306a511b6c59966fca10589e2#diff-330c82c60ddd0d2d2515dc2de3826bb7435f2b4bb877396e84138f76e913caac)    |
| #2             | [Implement pagination and navigation links](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/3125e1c46c5c5dd09dd98f9b4fcfa065e15c351c)      |
| #3             | [Add error page and correct redirections](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/3b4810d2c5a639875bd199871408b48c8e998eb4#diff-c72a907ac323cd2f334ed0e2bd07d15ab62581c4753660c8a0d1c681b30be4b6)             |
| #4             | [Add functionality to the search engine](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/93f83872af132550e334b7382d5494390e034a61#diff-16bf5e6f6409ae313abd87700718e0cc3b01fefdff7042adcd7f77f022ae9b93)               |
| #5             | [Add search by category](https://github.com/CodeURJC-FW-2025-26/webapp19/commit/ac9610ea1882925a1e4db843f4864abbca304768)                                                                         |

#### The 5 files I have modified the most

| File Number | File                                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1             | [router.js](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/src/router.js)    |
| #2             | [clothing_shop.js](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/src/clothing_shop.js)      |
| #3             | [header.html](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/views/header.html)             |
| #4             | [index.html](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/views/index.html)               |
| #5             | [load_data.js](https://github.com/CodeURJC-FW-2025-26/webapp19/blob/main/src/load_data.js) 
----
#### Sergio González Gútiez: 


#### My 5 most significant commits

| Commit Number | Commit                                                                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1             | |
| #2             |  |
| #3             |  |
| #4             | |
| #5             | |

#### The 5 files I have modified the most

| File Number | File                                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1             |   |
| #2             |        |
| #3             |         |
| #4             |               |
| #5             |  
----
#### Alejandro Martín Carrera:


#### My 5 most significant commits

| Commit Number | Commit                                                                                                                                                                                    |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1             | |
| #2             | |
| #3             | |
| #4             |  |
| #5             | |

#### The 5 files I have modified the most

| File Number | File                                                                                                                                                                                   |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| #1             |   |
| #2             |        |
| #3             |           |
| #4             |              |
| #5             | 

----
💻 *Developed by Group 19 · FashionHub*
