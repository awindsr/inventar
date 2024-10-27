# Inventory Management System
![inventar](https://socialify.git.ci/awindsr/inventar/image?description=1&descriptionEditable=%20Inventory%20Management%20System%20built%20with%20Next.js%20to%20manage%20products%2C%20including%20adding%2C%20editing%2C%20and%20deleting%20product%20information.&font=Raleway&language=1&name=1&owner=1&pattern=Plus&theme=Dark)


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Installation](#installation)
- [Usage](#usage)
- [API Reference](#api-reference)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Secure user authentication using Supabase.
- **CRUD Operations**: Create, Read, Update, and Delete products in the inventory.
- **Responsive Design**: Mobile-friendly interface for managing products.
- **Real-time Updates**: Automatically updates the UI when changes are made to the database.
- **Search and Filter**: Easily search and filter products based on various criteria.
- **Error Handling**: Comprehensive error handling for user actions.

## Technologies Used

- **Frontend**: 
  - [Next.js](https://nextjs.org) - A React framework for building server-side rendered applications.
  - [React](https://reactjs.org) - A JavaScript library for building user interfaces.
  - [Tailwind CSS](https://tailwindcss.com) - A utility-first CSS framework for styling.

- **Backend**: 
  - [Supabase](https://supabase.io) - An open-source Firebase alternative that provides a backend as a service.

- **Database**: 
  - PostgreSQL - A powerful, open-source relational database.

## Getting Started

To get started with the project, follow the instructions below.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/inventory-management-system.git
   cd inventory-management-system
   ```

2. **Install dependencies**:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up Supabase**:
   - Create a new project on [Supabase](https://supabase.io).
   - Set up your database schema according to the provided SQL scripts in the `supabase` folder.
   - Obtain your Supabase URL and anon key.

4. **Configure environment variables**:
   Create a `.env.local` file in the root of the project and add your Supabase credentials:
   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### Usage

1. **Run the development server**:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

2. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000) to view the application.

3. **Explore the features**:
   - Log in or sign up to access the inventory management features.
   - Add new products, edit existing ones, and delete products as needed.

## API Reference

The application interacts with the Supabase API for managing products. Below are the key endpoints used:

- **GET /products**: Fetch all products.
- **POST /products**: Create a new product.
- **PUT /products/:id**: Update an existing product by ID.
- **DELETE /products/:id**: Delete a product by ID.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

Feel free to reach out if you have any questions or need further assistance!
