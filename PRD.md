# **Product Requirements Document (PRD): Novera-Fits E-Commerce**

## **1\. Executive Summary**

**Project Name:** NoveraFits

**Description:** A premium, polished e-commerce platform for women's clothing and accessories.

**Design Philosophy:** "Airbnb-Inspired." The UI must focus on extreme minimalism, heavy use of white space, soft rounded corners (rounded-xl or 2xl), subtle drop shadows, and high-quality imagery. The interaction design should feel fluid and "app-like."

**Core Experience:** **Frictionless.** No customer accounts, no login walls. Pure guest checkout and easy order tracking.

## **2\. Technical Stack (Strict Constraints)**

The system must be a **Monolithic Full-Stack Application** contained entirely within Next.js.

* **Framework:** Next.js 14+ (App Router).  
* **Language:** TypeScript.  
* **Styling:** Tailwind CSS (Crucial for the polished look).  
* **Icons:** Lucide React (Clean, thin strokes).  
* **Component Library:** Shadcn UI.  
* **Database:** **Firebase Firestore (NoSQL).**  
* **Authentication:** **Firebase Authentication (ADMIN ONLY).** Customers do not log in.  
* **State Management:** React Context API or Zustand.  
* **Image Storage:** **LOCAL FILE SYSTEM STORAGE.** Images are uploaded via API and stored in the /public/uploads directory. *No external cloud storage.*

## **3\. Design System & UI/UX (The "Airbnb" Vibe)**

### **3.1 Core Visuals**

* **Typography:** Sans-serif, geometric but readable (e.g., Inter or Geist).  
* **Cards:** Products are displayed in cards with rounded-xl borders. No hard lines separating the image from the text.  
* **Shadows:** Soft, diffused shadows (shadow-sm typically, shadow-md on hover).  
* **Buttons:**  
  * Primary: Solid brand color (e.g., Soft Rose or Burnt Orange), rounded-lg, bold text.  
  * Secondary: White background, 1px grey border, black text.  
* **Navigation:** clean, sticky top navbar with a search bar that mimics the "pill" shape found in travel apps.

### **3.2 Layouts**

* **Grid:** Responsive masonry or uniform grid for product listings.  
* **Modals:** Admin Login should open in a centered modal.

## **4\. User Roles & Features**

### **4.1 Role: Guest / Customer (No Login Required)**

* **Homepage:** Hero section with a "lifestyle" image, followed by "Trending Categories" (circular icons) and "Just Dropped" (scrollable card row).  
* **Product Listing:**  
  * Filter bar (sticky) for Category, Size, Color, Price.  
  * Image carousel *inside* the product card (on hover arrows).  
* **Product Details Page (PDP):**  
  * Split layout: Left side is a scrolling gallery of large images; Right side is sticky containing Title, Price, Size Selector, and "Add to Bag".  
* **Cart & Guest Checkout:**  
  * **Slide-out Drawer:** Clicking cart icon opens a drawer from the right.  
  * **Checkout Flow:** Single page. User enters Email, Shipping Address, and Payment info. **No account creation.**  
  * **Success Page:** Displays the **Order ID** prominently with a "Copy" button so the user can track it later.  
* **Order Tracking Page:**  
  * **Route:** /tracking  
  * **UI:** A simple, clean centered search bar.  
  * **Action:** User pastes their Order ID \-\> System displays current status (Processing, Shipped, etc.) and order summary.

### **4.2 Role: Administrator (Admin Panel)**

* **Access:** Secured via Firebase Auth (Email/Password).  
* **Dashboard:** Simple analytics (Total Sales, Orders Pending, Low Stock).  
* **Product Management (CRUD):**  
  * Table view of products with thumbnail, name, price, stock status.  
  * **Create/Edit Product Form:**  
    * Inputs: Title, Description (Rich text), Price, Category, Stock Count.  
    * **Image Uploader:** Drag-and-drop zone. *This allows the admin to upload files which are then saved to the local directory.*  
* **Order Management:**  
  * View all guest orders.  
  * Change status (Processing \-\> Shipped \-\> Delivered).

## **5\. Data Architecture (Firebase Firestore)**

The database will use a NoSQL document structure.

### **Collection: admins (Optional, or just use Auth UID)**

* **Document ID:** uid (from Firebase Auth)  
* **Fields:** email, role: "ADMIN"

### **Collection: products**

* **Document ID:** Auto-generated UUID  
* **Fields:**  
  * name (string)  
  * description (string)  
  * price (number)  
  * category (string)  
  * stock (number)  
  * images (Array of strings): *Stores local paths, e.g., \["/uploads/img\_123.jpg"\]*  
  * createdAt (timestamp)

### **Collection: orders**

* **Document ID:** Auto-generated UUID (This is the **Tracking ID**)  
* **Fields:**  
  * customerEmail (string)  
  * shippingAddress (Map): Street, City, Zip, Country.  
  * status (string: "PENDING", "SHIPPED", "DELIVERED")  
  * total (number)  
  * items (Array of Maps):  
    * productId (string)  
    * productName (string)  
    * quantity (number)  
    * price (number)  
  * createdAt (timestamp)

## **6\. API & File Handling Specification**

### **6.1 API Routes (Next.js App Router)**

* GET /api/products: Public. Fetch products.  
* GET /api/orders/\[id\]: Public. Fetch order status by ID (for Tracking Page).  
* POST /api/orders: Public. Create new order (Guest Checkout).  
* POST /api/products: **Protected.** (Admin) Verify Admin token, then write to Firestore.

### **6.2 Local Image Upload Implementation (Crucial)**

Since we are strictly avoiding external cloud storage, the backend API route for image upload must use Node.js fs (FileSystem).

**Logic for POST /api/upload:**

1. Receive FormData containing the file.  
2. Convert file to Buffer.  
3. Generate unique filename (timestamp \+ original name).  
4. Write file to ./public/uploads/{filename} using Node fs.  
5. Return the relative public path: /uploads/{filename}.  
6. *The Admin form then takes this path and saves it to the Firestore Product document.*

## **7\. Folder Structure**

/app  
  /api  
    /products  
    /orders  
      /\[id\]       \<-- Tracking API  
    /upload       \<-- Logic for saving files to /public  
  /admin          \<-- Protected Admin Dashboard  
  /shop           \<-- Product browsing  
  /tracking       \<-- Order Tracking Page  
  /cart  
  page.tsx        \<-- Homepage  
  layout.tsx  
/components  
  /ui             \<-- Reusable UI (Buttons, Cards, Inputs)  
  /layout         \<-- Navbar, Footer, CartDrawer  
  /admin          \<-- Admin specific tables/forms  
/lib  
  firebase.ts      \<-- Client SDK initialization  
  firebaseAdmin.ts \<-- Admin SDK (for server-side API routes)  
  utils.ts  
/public  
  /uploads        \<-- STORAGE TARGET FOR PRODUCT IMAGES

## **8\. Development Roadmap for AI Generation**

1. **Setup:** Initialize Next.js and Tailwind.  
2. **Firebase:** Configure Firestore (open rules for reading products/creating orders, locked for deleting/updating unless Admin).  
3. **Backend:** Create upload API (fs) and orders API (public read/write).  
4. **Frontend \- Tracking:** Build /tracking page that queries GET /api/orders/\[id\].  
5. **Frontend \- Shop:** Build Guest Checkout form (no auth required).  
6. **Admin:** Build protected dashboard for product management.