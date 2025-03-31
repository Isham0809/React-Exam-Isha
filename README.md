# User Management CRUD Application

## Features ✨
- **Read** users with dynamic table listing ✅
- **Delete** users from the database ✅
- **Search** users by Name, Email, or Phone ✅
- **Pagination** with customizable records per page (5, 10, or 15) ✅
- **Sorting & Filtering** when clicking on the filter icons ✅

## Technologies Used 🛠️
- React.js ⚛️
- Bootstrap 🎨
- JSON Server (for mock backend) 🗄️

## JSON Server Setup ⚙️

Ensure you have `db.json` in the project root with the following structure:
please start json server using npx json-server db.json

```json
{
  "users": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "johndoe@example.com",
      "phone": "1234567890",
      "image": "https://via.placeholder.com/100"
    }
  ]
}
```

## Usage 🚀
- **Deleting Users:** Click the red trash icon 🗑️.
- **Searching Users:** Use the search box 🔍.
- **Filtering Users:** Click the sorting icons next to the column names.
- **Pagination:** Use the dropdown to select how many records to display.

## Screenshots 📸
![image](https://github.com/user-attachments/assets/c3879d14-4c0b-44d4-baf5-a8760dfc6eaf)




