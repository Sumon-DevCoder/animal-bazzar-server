# **Animal Bazaar - Backend**

**Animal Bazaar** is a comprehensive, full-stack e-commerce application built with **Next.js**. The platform facilitates seamless interaction between two key user roles: **Admin** and **User**. It’s designed specifically for the sale and management of animals, focusing on providing a streamlined user experience for customers while empowering administrators with robust management capabilities. The application is built with **TypeScript**, **Tailwind CSS**, and leverages **Next.js App Router** for efficient server-side rendering and routing.

## **Live Demo**

[Live Link](https://animal-bazaar-server.vercel.app/)

## **Table of Contents**

- [Project Overview](#project-overview)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Installation](#installation)

# Project Overview:

**Animal Bazaar** is an innovative e-commerce application tailored for the animal trade, built with **Next.js** to facilitate an interactive platform for both buyers and administrators. This full-stack application emphasizes a seamless shopping experience, effective booking management, and efficient administrative control, offering unique features designed for animal sales and reservation of purchasing.

## Objectives

- **Seamless User Experience**: Provide an intuitive, responsive, and accessible shopping and booking experience, allowing users to browse, search, and filter animal listings.
- **Efficient Booking System**: Enable users to reserve animals or product slots, with real-time availability feedback and dynamic pricing calculations.
- **Robust Admin Management**: Empower admins with tools to manage products, orders, payments, and slot reservations, supporting operational efficiency and effective inventory control.
- **Scalability**: Ensure the platform can handle growing traffic and data, accommodating an expanding inventory, user base, and booking needs.
- **Real-Time Interaction**: Implement real-time updates for product and slot availability to enhance user engagement and admin oversight.

## Core Features

1. **Product Browsing and Management**:

   - Detailed animal listings organized by categories (e.g., Fish, Cow, Hen, Duck)
   - Search, filtering, and pagination for optimized browsing and selection

2. **User Booking**:

   - **Browse** available animals and reservation slots.
   - **Create bookings** by selecting preferred animals and slots.
   - **Automatic Pricing Calculation**: Total cost is calculated based on selected slots and associated pricing.
   - **Real-Time Availability**: Users receive instant feedback on slot and product availability.

3. **Admin & User Roles**:

   - **Admin**: Comprehensive dashboard with tools for product, order, payment, and slot management
   - **User**: Simplified checkout, cart management, and booking process for a smooth purchasing journey

4. **Responsive and Aesthetic UI**:

   - Green-themed design for visual consistency
   - Enhanced sidebar navigation with interactive elements like border styles and emojis

5. **Additional Functionalities**:
   - AdminSidebar with Home, About, and Contact links that auto-collapse on smaller screens
   - Real-time updates for users on availability and for admins on booking and order processing

**Animal Bazaar** delivers a fully functional, user-friendly, and scalable platform for the animal trade, supporting effective interaction between admins and users. The new booking feature adds versatility, making it easy for users to secure products or slots while ensuring admins can monitor availability and bookings effectively.

## Technology Stack

- **Frontend**: Next.js, Tailwind CSS, TypeScript
- **Backend**: Next.js API routes, custom Axios instance for API handling
- **Authentication**: JWT stored in cookies for secure, persistent user sessions
- **Image Hosting**: ImgBB API for efficient product image storage
- **Payment Processing**: Amarpay integration for secure and reliable transactions
- **Programming Language:** TypeScript
- **Web Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose

## Installation

1. **Clone the repository**:

   ```bash
   git clone https://github.com/Sumon-DevCoder/animal-bazzar-server.git
   ```

2. **Navigate into the project directory**:

   ```bash
   cd Animal-Bazaar  - Backend

   ```

3. **Install dependencies**:

   ```bash
   npm install
   ```

4. **Create a `.env.local` file in the root directory and add your environment variables**:

   ```bash
   DB_URL=mongodb+srv://<username>:<password>@cluster0.0i0xa.mongodb.net/meetingRoomDB?retryWrites=true&w=majority&appName=Cluster0
   PORT=5000
   BCRYPT_SALT_ROUND=12
   NODE_ENV='development'
   NODE_ENV=development
   # payment credential (REDACTED)
   STORE_ID="aamarpaytest"
   SIGNETURE_KEY="dbb74894e82415a2f7ff0ec3a97e4183"
   PAYMENT_URL="https://sandbox.aamarpay.com/jsonpost.php"
   PAYMENT_VERIFY_URL="https://sandbox.aamarpay.com/api/v1/trxcheck/request.php"
   # admin credentials (REDACTED)
   admin_email=****\*\*\*****
   admin_password=****\*\*\*****
   admin_mobile_number=****\*\*\*****
   admin_image=****\*\*\*****
   # jwt credentials (REDACTED)
   JWT_ACCESS_SECRET=secret
   JWT_ACCESS_EXPIRES_iN=365d
   JWT_REFRESH_SECRET=refreshscret
   JWT_REFRESH_EXPIRES_IN=365d


   BACKEND_LIVE_URL=https://animal-bazaar-server.vercel.app/
   ```
